import { Injectable } from '@angular/core';
import {CommandToken} from './command-token';
import {Command} from './command';
import {LoggingService} from '../../logging.service';
import {TokenClassification} from './token-classification.enum';
import {TokenizerService} from './tokenizer.service';

@Injectable()
export class SentenceParserService {

  constructor(private logger: LoggingService,
              private tokenizer: TokenizerService) {

  }

  private static isNounLike(t): boolean {
    return t.classification === TokenClassification.Noun || t.classification === TokenClassification.Direction;
  }

  private static isVerbLike(t): boolean {
    return t.classification === TokenClassification.Verb;
  }

  private static isVerbModifier(t): boolean {
    return t.classification === TokenClassification.Adverb;
  }

  private static isNounModifier(t): boolean {
    return t.classification === TokenClassification.Determiner ||
      t.classification === TokenClassification.Adjective ||
      t.classification === TokenClassification.Preposition; // TODO: You could argue that prepositions link prior nouns to future words
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

  private buildSelfToken(): CommandToken {

    const token = this.tokenizer.getTokenForWord('I ');
    token.isInferred = true;

    return token;
  }

  private buildGoToken(): CommandToken {

    const token = this.tokenizer.getTokenForWord('go ');
    token.isInferred = true;

    return token;
  }

  public buildCommandFromSentenceTokens(sentence: string, tokens: CommandToken[]): Command {

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

    // At this point we MAY have a subject depending on the verb / noun order, but typically we won't. Assume it is "I" if no subject
    this.inferSubjectIfNeeded(command);

    // Build a list of raw tokens including inferred verb and subject
    this.identifyRawTokensIncludingInferred(command, tokens);

    // Adverbs go at the sentence level, though perhaps they could be associated with the verb
    this.identifyVerbModifiers(command, tokens);

    // Adjectives and articles get associated with the next noun
    this.associateNounModifiers(command, tokens);

    // TODO: It'd be nice to register other aspects of the sentence as modifiers on other words, but this will work for an early engine

    return command;

  }

  private inferSubjectIfNeeded(command: Command) {

    // If we didn't have a noun that qualified as a subject, go ahead and add an implicit self token to the beginning of the sentence
    if (!command.subject) {

      const self: CommandToken = this.buildSelfToken();
      command.subject = self;
    }

  }

  private identifyRawTokensIncludingInferred(command: Command, tokens: CommandToken[]): void {

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
        nextNoun.setModifiedBy(modifier);
      } else {
        this.logger.warning(`Could not find a word to associate with the token '${modifier.name}'`);
      }

    }
  }

  private identifyVerbModifiers(command: Command, tokens: CommandToken[]) {

    // Grab the adverbs and stick them into the sentence as modifiers on the overall sentence
    const adverbs: CommandToken[] = tokens.filter(t => SentenceParserService.isVerbModifier(t));
    for (const adverb of adverbs) {

      if (command.verb) {
        command.verb.setModifiedBy(adverb);
      } else {
        this.logger.warning(`No verb present for the adverb '${adverb.name}' to modify`);
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

      // TODO: We should attempt to interpret remaining verb symbols in other contexts. E.G. Open can be a verb and an adjective
    }

  }

}
