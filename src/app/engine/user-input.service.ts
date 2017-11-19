import { Injectable } from '@angular/core';
import {TokenClassification} from './parser/token-classification.enum';
import {CommandToken} from './parser/command-token';
import {LoggingService} from '../utility/logging.service';
import {TokenizerService} from './parser/tokenizer.service';
import {TextOutputService} from './text-output.service';
import {Command} from './parser/command';
import {SentenceParserService} from './parser/sentence-parser.service';
import {InteractiveFictionService} from './interactive-fiction.service';
import {StringHelper} from '../utility/string-helper';
import {CommandContext} from './command-context';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {CommandResult} from './command-result';
import {LexiconService} from './parser/lexicon.service';

@Injectable()
export class UserInputService {

  constructor(private logger: LoggingService,
              private tokenizer: TokenizerService,
              private lexer: LexiconService,
              private sentenceParser: SentenceParserService,
              private ifService: InteractiveFictionService,
              private outputService: TextOutputService) { }

  public handleUserSentence(sentence: string): CommandResult {

    // This is for exception handling testing
    if (sentence === 'throw error') {
      throw new Error('By your command.');
    }

    const context: CommandContext = this.ifService.buildCommandContext();

    // Break the user's input down to tokens with parts of speech defined. This will also perform smart-replacement.
    const tokens = this.extractTokensFromInput(sentence);

    // Now that we know what the user said, try to figure out what it means
    const command: Command = this.sentenceParser.buildCommandFromSentenceTokens(sentence, tokens, context);

    const isDebugCommand: boolean = command.verb && (command.verb.name === 'debug' || command.verb.name === 'reportbug');
    if (isDebugCommand) {
      this.logger.debug('Command recognized as a debugging command');
    }

    this.outputService.displayUserCommand(sentence, command);

    // At this point, we shouldn't have tokens coming in that we can't even classify, but check to be sure
    const unknowns: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Unknown);
    if (unknowns && unknowns.length > 0 && !isDebugCommand) {
      this.displayParserError(unknowns, context);

      const unknownResult = CommandResult.BuildParseFailedResult();
      unknownResult.command = command;
      return unknownResult;
    }

    // Now that we know the basic sentence structure, let's look at the execution context and see if we can't identify what tokens map to.
    context.resolveNouns(tokens, !isDebugCommand);

    // Create a command context. This will give the command handler more utility information
    this.ifService.logUserCommandToAnalytics(context, command);

    // If the parser wasn't sure what we were referring to with something, then don't send it to a verb handler.
    let result: CommandResult;
    if (context.wasConfused && !(isDebugCommand)) {
      result = CommandResult.BuildParseFailedResult();
    } else {
      // Okay, we can send the command off to be interpreted and just return the result
      result = this.ifService.handleUserCommand(command, context);
    }

    result.command = command;
    return result;
  }


  private extractTokensFromInput(sentence: string): CommandToken[] {

    // Log it to console and stick the command into the main window for user reference
    this.logger.log(`Input sentence: '${sentence}'`);

    sentence = this.lexer.replaceWords(sentence);

    // Break down the input into command tokens
    const tokens: CommandToken[] = this.tokenizer.getTokensForSentence(sentence);

    // Some tokens are shortcuts for common actions. These should be replaced as if the user had spoken the full word.
    this.lexer.replaceTokens(tokens, this.tokenizer);

    return tokens;
  }

  private displayParserError(unknowns: CommandToken[], context: CommandContext): void {

    // Tell the user they're full of it
    let friendlyText: string;
    if (unknowns && unknowns.length === 1) {
      friendlyText = unknowns[0].userInput;
    } else {
     friendlyText = StringHelper.toOxfordCommaList(unknowns.map(u => u.userInput), 'or');
    }
    this.outputService.displayParserError(`I don't know what ${friendlyText} mean.`);

    // Log each unknown token to Google Analytics
    for (const token of unknowns) {

      GoogleAnalyticsService.instance.emitEvent(
        'Unknown Token',
        token.name,
        `${context.story.name} - ${context.currentRoom.name}`);

    }

  }

}
