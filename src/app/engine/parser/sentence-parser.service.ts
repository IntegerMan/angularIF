import { Injectable } from '@angular/core';
import {CommandToken} from './command-token';
import {Command} from './command';
import {LoggingService} from '../../utility/logging.service';
import {TokenClassification} from './token-classification.enum';
import {TokenizerService} from './tokenizer.service';
import {LexiconService} from './lexicon.service';
import {CommandContext} from '../command-context';

@Injectable()
export class SentenceParserService {

  constructor(private logger: LoggingService,
              private tokenizer: TokenizerService,
              private lexer: LexiconService) {

  }

  public buildCommandFromSentenceTokens(sentence: string, tokens: CommandToken[], context: CommandContext): Command {

    // Validate inputs since we're an entry method
    if (!sentence || sentence.length <= 0) {
      throw new Error('Sentence is a required input');
    }
    if (!tokens || tokens.length <= 0) {
      throw new Error('Tokens are a required input');
    }

    // Log the interpreted tokens
    for (const token of tokens) {
      this.logger.log(`Read in ${token.classification} token '${token.name}' from input '${token.userInput}'`);
    }

    // Build the basic bones of the object we'll be interpreting now
    const command: Command = new Command(sentence);

    this.identifySentenceVerb(command, tokens);
    this.identifySentenceNouns(command, tokens);
    this.identifySentencePrepositions(command, tokens);

    // At this point we MAY have a subject depending on the verb / noun order, but typically we won't. Assume it is "I" if no subject
    this.inferSubjectIfNeeded(command, context);

    // For some specialized commands such as "Inventory", there may not be a verb. Handle those as needed.
    this.inferVerbIfNeeded(command);

    // Build a list of raw tokens including inferred verb and subject
    SentenceParserService.identifyRawTokensIncludingInferred(command, tokens);

    // Adverbs go at the sentence level, though perhaps they could be associated with the verb
    this.identifyVerbModifiers(command, tokens);

    // Adjectives and articles get associated with the next noun
    this.associateNounModifiers(command, tokens);

    return command;

  }

  private inferSubjectIfNeeded(command: Command, context: CommandContext) {

    // If we didn't have a noun that qualified as a subject, go ahead and add an implicit self token to the beginning of the sentence
    if (!command.subject) {
      command.subject = this.buildSelfToken(context);
    }

  }


  private inferVerbIfNeeded(command: Command) {

    // This will handle some specialized commands such as "Inventory" or "Verbs"
    if (!command.verb && command.objects.length === 1) {
      command.verb = this.buildLookToken();
    }

  }

  private static identifyRawTokensIncludingInferred(command: Command, tokens: CommandToken[]): void {

    // If we inferred a subject, stick that in the token list as well before the rest of the sentence
    if (command.subject && command.subject.isInferred) {
      command.tokens.push(command.subject);
    }

    // If we inferred a verb, stick that in the token list as well before the rest of the sentence
    if (command.verb && command.verb.isInferred) {
      command.tokens.push(command.verb);
    }

    // Copy all raw tokens over to the tokens array
    for (const token of tokens) {
      command.tokens.push(token);
    }
  }

  private associateNounModifiers(command: Command, tokens: CommandToken[]) {
    const nounModifiers: CommandToken[] = tokens.filter(t => SentenceParserService.isNounModifier(t));
    for (const modifier of nounModifiers) {

      const nextNoun: CommandToken = SentenceParserService.findNextNoun(modifier);
      if (nextNoun) {

        this.logger.log(`Associating modifier '${modifier.name}' with '${nextNoun.name}'`);
        nextNoun.setModifiedBy(modifier);

      } else if (command.verb && modifier.classification === TokenClassification.Preposition) {

        // When we're ending a sentence in a preposition, we're going to say it modifies the verb. Case in point: "Look around"
        command.verb.setModifiedBy(modifier);

      } else {

        this.logger.warning(`Could not find a word to associate with the modifier '${modifier.name}'`);

      }

    }
  }

  private identifyVerbModifiers(command: Command, tokens: CommandToken[]) {

    // Grab the adverbs and stick them into the sentence as modifiers on the overall sentence
    const adverbs: CommandToken[] = tokens.filter(t => SentenceParserService.isVerbModifier(t));
    for (const adverb of adverbs) {

      let target: CommandToken = SentenceParserService.findNextAdverb(adverb);

      if (!target) {
        target = command.verb;
      }

      if (target) {

        this.logger.log(`Associating adverb '${adverb.name}' with '${target.name}'`);
        target.setModifiedBy(adverb);

      } else {

        this.logger.warning(`No target present for the adverb '${adverb.name}' to modify`);

      }
    }
  }

  private identifySentenceNouns(command: Command, tokens: CommandToken[]): void {

    let indexOfVerb: number = -1;
    if (command.verb) {
      indexOfVerb = tokens.indexOf(command.verb);
    }

    // Grab the nouns and stick them into the sentence as the objects
    const nouns: CommandToken[] = tokens.filter(t => SentenceParserService.isNounLike(t));
    for (const noun of nouns) {

      // When no verbs are present and the first noun is a direction, interpret it as a 'Go' verb.
      if (!command.verb && noun.classification === TokenClassification.Direction) {
        command.verb = this.buildGoToken();
      }

      // If this noun comes before the verb, we're going to use it as a subject instead of as an object, but only for the first noun
      if (!command.subject && indexOfVerb > tokens.indexOf(noun)) {
        command.subject = noun;
      } else {
        command.objects.push(noun);
      }
    }
  }

  private identifySentenceVerb(command: Command, tokens: CommandToken[]): void {

    // Grab the first verb and stick that into the sentence as the sentence's main verb
    const verbs: CommandToken[] = tokens.filter(t => SentenceParserService.isVerbLike(t));
    if (verbs.length > 0) {
      command.verb = verbs[0];

      if (verbs.length > 1) {
        for (const verb of verbs.splice(1)) {
          if (this.lexer.attemptToInterpretAsNonVerb(verb)) {
            this.logger.debug(`Reclassified ${verb.name} as ${verb.classification} since it was not the first verb in the sentence.`);
          }
        }
      }
    }

  }

  private identifySentencePrepositions(command: Command, tokens: CommandToken[]): void {

    // Grab the first verb and stick that into the sentence as the sentence's main verb
    const prepositions: CommandToken[] = tokens.filter(t => SentenceParserService.isPreposition(t));
    for (const prep of prepositions) {
      command.addPreposition(prep);

      // If this IS a preposition, we'll want to link it to the prior noun as well. Case study here "worn patch of grass" - we'll want to
      // be able to identify this with the phrase "worn grass" and that's only possible if they're linked together via the of prepositional
      // phrase
      if (prep.previousToken && SentenceParserService.isNounLike(prep.previousToken)) {
        prep.previousToken.setModifiedBy(prep);
      }
    }

  }

  private static isNounLike(t: CommandToken): boolean {
    return t.classification === TokenClassification.Noun || t.classification === TokenClassification.Direction;
  }

  private static isVerbLike(t: CommandToken): boolean {
    return t.classification === TokenClassification.Verb;
  }

  private static isVerbModifier(t: CommandToken): boolean {
    return t.classification === TokenClassification.Adverb;
  }

  private static isNounModifier(t: CommandToken): boolean {
    return t.classification === TokenClassification.Determiner ||
      t.classification === TokenClassification.Adjective ||
      t.classification === TokenClassification.Preposition; // TODO: You could argue that prepositions link prior nouns to future words
  }

  private static isPreposition(t: CommandToken): boolean {
    return t.classification === TokenClassification.Preposition;
  }

  private static findNextNoun(modifier: CommandToken): CommandToken {

    let next: CommandToken = modifier.nextToken;
    while (next) {
      if (SentenceParserService.isNounLike(next)) {
        return next;
      }

      next = next.nextToken;
    }

  }

  private static findNextAdverb(modifier: CommandToken): CommandToken {

    let next: CommandToken = modifier.nextToken;
    while (next) {
      if (SentenceParserService.isVerbModifier(next)) {
        return next;
      }

      next = next.nextToken;
    }

  }

  private buildSelfToken(context: CommandContext): CommandToken {

    const token = this.tokenizer.getTokenForWord('I ');
    token.isInferred = true;
    token.entity = context.player;

    return token;
  }

  private buildGoToken(): CommandToken {

    const token = this.tokenizer.getTokenForWord('go ');
    token.isInferred = true;

    return token;
  }

  private buildLookToken(): CommandToken {

    const token = this.tokenizer.getTokenForWord('look ');
    token.isInferred = true;

    return token;
  }
}
