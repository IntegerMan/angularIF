import { Injectable } from '@angular/core';
import {TokenClassification} from './tokenizer/token-classification.enum';
import {CommandToken} from './tokenizer/command-token';
import {LoggingService} from '../logging.service';
import {TokenizerService} from './tokenizer/tokenizer.service';
import {TextOutputService} from './text-output.service';
import {Command} from './tokenizer/command';
import {SentenceParserService} from './tokenizer/sentence-parser.service';
import {InteractiveFictionService} from './interactive-fiction.service';

@Injectable()
export class UserInputService {

  constructor(private logger: LoggingService,
              private tokenizer: TokenizerService,
              private sentenceParser: SentenceParserService,
              private ifService: InteractiveFictionService,
              private outputService: TextOutputService) { }

  public handleUserSentence(sentence: string): boolean {

    // Log it to console and stick the command into the main window for user reference
    this.logger.log(`Input sentence: '${sentence}'`);

    // TODO: From this thing's perspective, it's probably best to work with a single sentence or command object aggregating the tokens

    // Break down the input into command tokens
    const tokens: CommandToken[] = this.tokenizer.getTokensForSentence(sentence);
    const command: Command = this.sentenceParser.buildCommandFromSentenceTokens(sentence, tokens);
    this.outputService.displayUserCommand(sentence, command);

    // At this point, we shouldn't have tokens coming in that we can't even classify, but check to be sure
    const unknowns: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Unknown);
    if (unknowns && unknowns.length > 0) {
      this.displayParserError(unknowns);
      return false;
    }

    // Okay, we can send the command off to be interpreted and just return the result
    return this.ifService.handleUserCommand(command);
  }

  private displayParserError(unknowns: CommandToken[]): void {
    let message: string;

    if (unknowns.length === 1) {
      message = `I'm sorry, but I don't know what '${unknowns[0].userInput}' means.`;
    } else if (unknowns.length === 2) {
      message = `I'm sorry, but I don't know what '${unknowns[0].userInput}' or '${unknowns[1].userInput}' mean.`;
    } else {

      let wordStrings: string = '';
      for (const t of unknowns) {

        if (t === unknowns[unknowns.length - 1]) {
          wordStrings += `or '${t.userInput}'`;
        } else {
          wordStrings += `'${t.userInput}', `;
        }

      }
      message = `I'm sorry, but I don't know what ${wordStrings} mean.`;
    }

    this.outputService.displayParserError(message);
  }
}
