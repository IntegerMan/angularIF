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

  private getSelfToken(): CommandToken {

    const token = this.tokenizer.getTokenForWord('I ');
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
    const verbs: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Verb);
    if (verbs.length > 0) {
      command.verb = verbs[0];

      // TODO: We should attempt to interpret remaining verb symbols in other contexts. E.G. Open can be a verb and an adjective
    }

    // TODO: Sentences will sometimes carry an explicit Noun subject, particularly if the noun precedes the verb
    const self = this.getSelfToken();
    command.subject = self;

    // Ensure the self token gets pushed ahead of all other raw tokens
    command.tokens.push(self);

    // Copy all raw tokens over to the tokens array
    for (const token of tokens) {
      command.tokens.push(token);
    }

    // Grab the nouns and stick them into the sentence as the objects
    const nouns: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Noun);
    for (const noun of nouns) {
      command.objects.push(noun);
    }

    // Grab the adverbs and stick them into the sentence as modifiers on the overall sentence
    const adverbs: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Adverb);
    for (const adverb of adverbs) {
      command.sentenceModifiers.push(adverb);
    }

    // TODO: It'd be nice to register other aspects of the sentence as modifiers on other words, but this will work for an early engine

    return command;

  }
}
