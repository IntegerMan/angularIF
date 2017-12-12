import {CommandContext} from '../command-context';
import {Command} from './command';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from './lexicon.service';
import {CommandToken} from './command-token';
import {TokenClassification} from './token-classification.enum';

export class SentenceParser {

  public static buildCommandFromSentenceTokens(sentence: string, tokens: CommandToken[], context: CommandContext): Command {

    // Validate inputs since we're an entry method
    if (!sentence || sentence.length <= 0) {
      throw new Error('Sentence is a required input');
    }
    if (!tokens || tokens.length <= 0) {
      throw new Error('Tokens are a required input');
    }

    // Log the interpreted tokens
    for (const token of tokens) {
      LoggingService.instance.log(`Read in ${token.classification} token '${token.name}' from input '${token.userInput}'`);
    }

    // Build the basic bones of the object we'll be interpreting now
    const command: Command = new Command(sentence);

    SentenceParser.identifySentenceVerb(command, tokens);
    SentenceParser.identifySentenceNouns(command, context, tokens);
    SentenceParser.identifySentencePrepositions(command, tokens);

    // At this point we MAY have a subject depending on the verb / noun order, but typically we won't. Assume it is "I" if no subject
    SentenceParser.inferSubjectIfNeeded(command, context);

    // For some specialized commands such as "Inventory", there may not be a verb. Handle those as needed.
    SentenceParser.inferVerbIfNeeded(command, context);

    // Build a list of raw tokens including inferred verb and subject
    SentenceParser.identifyRawTokensIncludingInferred(command, tokens);

    // Adverbs go at the sentence level, though perhaps they could be associated with the verb
    SentenceParser.identifyVerbModifiers(command, tokens);

    // Adjectives and articles get associated with the next noun
    SentenceParser.associateNounModifiers(command, tokens);

    return command;

  }

  private static inferSubjectIfNeeded(command: Command, context: CommandContext) {

    // If we didn't have a noun that qualified as a subject, go ahead and add an implicit self token to the beginning of the sentence
    if (!command.subject) {
      command.subject = SentenceParser.buildSelfToken(context);
    }

  }

  private static inferVerbIfNeeded(command: Command, context: CommandContext): void {

    if (command.verb) {
      return;
    }

    // This will handle some specialized commands such as "Inventory" or "Verbs"
    if (command.objects.length === 1) {
      if (command.objects[0].classification === TokenClassification.Direction) {
        command.verb = SentenceParser.buildGoToken(context);
      } else {
        command.verb = SentenceParser.buildLookToken(context);
      }
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

  private static associateNounModifiers(command: Command, tokens: CommandToken[]): void {
    const nounModifiers: CommandToken[] = tokens.filter(t => SentenceParser.isNounModifier(t));
    for (const modifier of nounModifiers) {

      const nextNoun: CommandToken = SentenceParser.findNextNoun(modifier);
      if (nextNoun) {

        LoggingService.instance.log(`Associating modifier '${modifier.name}' with '${nextNoun.name}'`);
        nextNoun.setModifiedBy(modifier);

      } else if (command.verb && modifier.classification === TokenClassification.Preposition) {

        // When we're ending a sentence in a preposition, we're going to say it modifies the verb. Case in point: "Look around"
        command.verb.setModifiedBy(modifier);

      } else {

        LoggingService.instance.warning(`Could not find a word to associate with the modifier '${modifier.name}'`);

      }

    }
  }

  private static identifyVerbModifiers(command: Command, tokens: CommandToken[]): void {

    // Grab the adverbs and stick them into the sentence as modifiers on the overall sentence
    const adverbs: CommandToken[] = tokens.filter(t => SentenceParser.isVerbModifier(t));
    for (const adverb of adverbs) {

      let target: CommandToken = SentenceParser.findNextAdverb(adverb);

      if (!target) {
        target = command.verb;
      }

      if (target) {

        LoggingService.instance.log(`Associating adverb '${adverb.name}' with '${target.name}'`);
        target.setModifiedBy(adverb);

      } else {

        LoggingService.instance.warning(`No target present for the adverb '${adverb.name}' to modify`);

      }
    }
  }

  private static identifySentenceNouns(command: Command, context: CommandContext, tokens: CommandToken[]): void {

    let indexOfVerb: number = -1;
    if (command.verb) {
      indexOfVerb = tokens.indexOf(command.verb);
    }

    // Grab the nouns and stick them into the sentence as the objects
    const nouns: CommandToken[] = tokens.filter(t => SentenceParser.isNounLike(t));
    for (const noun of nouns) {

      // If this noun comes before the verb, we're going to use it as a subject instead of as an object, but only for the first noun
      if (!command.subject && indexOfVerb > tokens.indexOf(noun)) {
        command.subject = noun;
      } else {
        command.objects.push(noun);
      }
    }
  }

  private static identifySentenceVerb(command: Command, tokens: CommandToken[]): void {

    // Grab the first verb and stick that into the sentence as the sentence's main verb
    const verbs: CommandToken[] = tokens.filter(t => SentenceParser.isVerbLike(t));
    if (verbs.length > 0) {
      command.verb = verbs[0];

      if (verbs.length > 1) {
        for (const verb of verbs.splice(1)) {
          if (LexiconService.instance.attemptToInterpretAsNonVerb(verb)) {
            LoggingService.instance.debug(
              `Reclassified ${verb.name} as ${verb.classification} since it was not the first verb in the sentence.`);
          }
        }
      }
    }

  }

  private static identifySentencePrepositions(command: Command, tokens: CommandToken[]): void {

    // Grab the first verb and stick that into the sentence as the sentence's main verb
    const prepositions: CommandToken[] = tokens.filter(t => SentenceParser.isPreposition(t));
    for (const prep of prepositions) {

      // If this IS a preposition, we'll want to link it to the prior noun as well. Case study here "worn patch of grass" - we'll want to
      // be able to identify this with the phrase "worn grass" and that's only possible if they're linked together via the of prepositional
      // phrase
      if (prep.name === 'of' && prep.previousToken && SentenceParser.isNounLike(prep.previousToken)) {
        prep.previousToken.setModifiedBy(prep);
      }

      // When we see in or out as the last word of a sentence, treat it as a direction
      if ((prep.name === 'in' || prep.name === 'out') && !prep.nextToken) {
        prep.classification = TokenClassification.Direction;
        command.objects.push(prep);
      } else {
        command.addPreposition(prep);
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
      if (SentenceParser.isNounLike(next)) {
        return next;
      }

      next = next.nextToken;
    }

  }

  private static findNextAdverb(modifier: CommandToken): CommandToken {

    let next: CommandToken = modifier.nextToken;
    while (next) {
      if (SentenceParser.isVerbModifier(next)) {
        return next;
      }

      next = next.nextToken;
    }

  }

  private static buildSelfToken(context: CommandContext): CommandToken {

    const token = context.engine.nlp.getTokenForWord('I ');
    token.isInferred = true;
    token.entity = context.player;

    return token;
  }

  private static buildGoToken(context: CommandContext): CommandToken {

    const token = context.engine.nlp.getTokenForWord('go ');
    token.isInferred = true;

    return token;
  }

  private static buildLookToken(context: CommandContext): CommandToken {

    const token = context.engine.nlp.getTokenForWord('look ');
    token.isInferred = true;

    return token;
  }

}
