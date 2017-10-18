import { Injectable } from '@angular/core';
import {TokenClassification} from './tokenizer/token-classification.enum';
import {CommandToken} from './tokenizer/command-token';
import {LoggingService} from '../logging.service';
import {TokenizerService} from './tokenizer/tokenizer.service';
import {TextOutputService} from './text-output.service';
import {Command} from './tokenizer/command';
import {SentenceParserService} from './tokenizer/sentence-parser.service';
import {InteractiveFictionService} from './interactive-fiction.service';
import {StringHelper} from '../utility/string-helper';
import {ArrayHelper} from '../utility/array-helper';
import {CommandContext} from './command-context';

@Injectable()
export class UserInputService {

  constructor(private logger: LoggingService,
              private tokenizer: TokenizerService,
              private sentenceParser: SentenceParserService,
              private ifService: InteractiveFictionService,
              private outputService: TextOutputService) { }

  public handleUserSentence(sentence: string): boolean {

    // Break the user's input down to tokens with parts of speech defined. This will also perform smart-replacement.
    const tokens = this.extractTokensFromInput(sentence);

    // Now that we know what the user said, try to figure out what it means
    const command: Command = this.sentenceParser.buildCommandFromSentenceTokens(sentence, tokens);
    this.outputService.displayUserCommand(sentence, command);

    // At this point, we shouldn't have tokens coming in that we can't even classify, but check to be sure
    const unknowns: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Unknown);
    if (unknowns && unknowns.length > 0) {
      this.displayParserError(unknowns);
      return false;
    }

    // Now that we know the basic sentence structure, let's look at the execution context and see if we can't identify what tokens map to.
    this.resolveNouns(tokens);

    // Okay, we can send the command off to be interpreted and just return the result
    return this.ifService.handleUserCommand(command);
  }

  private resolveNouns(tokens: CommandToken[]) {

    const context: CommandContext = this.ifService.buildCommandContext();
    const nouns: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Noun);
    for (const noun of nouns) {
      noun.entity = context.getSingleObjectForToken(noun);
    }

  }

  private extractTokensFromInput(sentence: string): CommandToken[] {

    // Log it to console and stick the command into the main window for user reference
    this.logger.log(`Input sentence: '${sentence}'`);

    sentence = this.substituteWordsAsNeeded(sentence);

    // Break down the input into command tokens
    const tokens: CommandToken[] = this.tokenizer.getTokensForSentence(sentence);

    // Some tokens are shortcuts for common actions. These should be replaced as if the user had spoken the full word.
    this.expandTokensAsNeeded(tokens);

    return tokens;
  }

  private displayParserError(unknowns: CommandToken[]): void {

    if (unknowns && unknowns.length === 1) {

      this.outputService.displayParserError(`I don't know what ${unknowns[0]} means.`);

    } else {

      const friendlyText = StringHelper.toOxfordCommaList(unknowns.map(u => u.userInput), 'or');
      this.outputService.displayParserError(`I don't know what ${friendlyText} mean.`);

    }
  }

  private substituteWordsAsNeeded(sentence: string): string {

    // TODO: It'd be nice to make this accessible for extension
    sentence = StringHelper.replaceAll(sentence, 'pick up', 'get', false);
    sentence = StringHelper.replaceAll(sentence, 'turn on', 'activate', false);
    sentence = StringHelper.replaceAll(sentence, 'turn off', 'deactivate', false);
    sentence = StringHelper.replaceAll(sentence, 'north east', 'northeast', false);
    sentence = StringHelper.replaceAll(sentence, 'north west', 'northwest', false);
    sentence = StringHelper.replaceAll(sentence, 'south east', 'southeast', false);
    sentence = StringHelper.replaceAll(sentence, 'south west', 'southwest', false);

    return sentence;
  }

  private expandTokensAsNeeded(tokens: CommandToken[]): CommandToken[] {

    // TODO: It'd be nice to make this accessible for extension
    const replacementValues = {};
    replacementValues['x'] = 'examine';
    replacementValues['i'] = 'inventory';
    replacementValues['l'] = 'look';
    replacementValues['e'] = 'east';
    replacementValues['w'] = 'west';
    replacementValues['s'] = 'south';
    replacementValues['n'] = 'north';
    replacementValues['u'] = 'up';
    replacementValues['d'] = 'down';
    replacementValues['ne'] = 'northeast';
    replacementValues['nw'] = 'northwest';
    replacementValues['sw'] = 'southwest';
    replacementValues['se'] = 'southeast';

    for (const t of tokens) {

      const replacementValue = replacementValues[t.name];

      if (replacementValue) {

        // Let's build an entirely new token for it
        const replacementToken: CommandToken = this.tokenizer.getTokenForWord(replacementValue);

        // Preserve the user input for traceability
        replacementToken.userInput = t.userInput;

        ArrayHelper.replace(tokens, t, replacementToken);
      }
    }

    return tokens;
  }

}
