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

  private static isSentenceModifier(t): boolean {
    return t.classification === TokenClassification.Adverb;
  }

  private getSelfToken(): CommandToken {

    const token = this.tokenizer.getTokenForWord('I ');
    token.isInferred = true;

    return token;
  }

  private getGoToken(): CommandToken {

    const token = this.tokenizer.getTokenForWord('go ');
    token.isInferred = true;

    return token;
  }

  public getCommandFromSentenceTokens(sentence: string, tokens: CommandToken[]): Command {

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

    // Grab the first verb and stick that into the sentence as the sentence's main verb
    let indexOfVerb: number = -1;
    const verbs: CommandToken[] = tokens.filter(t => SentenceParserService.isVerbLike(t));
    if (verbs.length > 0) {
      command.verb = verbs[0];
      indexOfVerb = tokens.indexOf(command.verb);

      // TODO: We should attempt to interpret remaining verb symbols in other contexts. E.G. Open can be a verb and an adjective
    }

    // Grab the nouns and stick them into the sentence as the objects
    const nouns: CommandToken[] = tokens.filter(t => SentenceParserService.isNounLike(t));
    for (const noun of nouns) {

      // TODO: When no verbs are present and the first noun is a direction, interpret it as a 'Go' verb.
      if (!command.verb && noun.classification === TokenClassification.Direction) {
        command.verb = this.getGoToken();
      }

      // If this noun comes before the verb, we're going to use it as a subject instead of as an object, but only for the first noun
      if (!command.subject && indexOfVerb > tokens.indexOf(noun)) {
        command.subject = noun;
      } else {
        command.objects.push(noun);
      }
    }

    // If we didn't have a noun that qualified as a subject, go ahead and add an implicit self token to the beginning of the sentence
    if (!command.subject) {

      const self = this.getSelfToken();
      command.subject = self;

      // Ensure the inferred self token gets pushed ahead of all other raw tokens
      command.tokens.push(self);
    }

    // If we inferred a verb, stick that in the token list as well before the rest of the sentence
    if (command.verb && command.verb.isInferred) {
      command.tokens.push(command.verb);
    }

    // Copy all raw tokens over to the tokens array
    for (const token of tokens) {
      command.tokens.push(token);
    }

    // Grab the adverbs and stick them into the sentence as modifiers on the overall sentence
    const adverbs: CommandToken[] = tokens.filter(t => SentenceParserService.isSentenceModifier(t));
    for (const adverb of adverbs) {
      command.sentenceModifiers.push(adverb);
    }

    // TODO: It'd be nice to register other aspects of the sentence as modifiers on other words, but this will work for an early engine

    return command;

  }

}
