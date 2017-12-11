import {GameState} from './game-state.enum';
import {EventEmitter} from '@angular/core';
import {Story} from './entities/story';
import {Command} from './parser/command';
import {VerbHandler} from './verbs/verb-handler';
import {RenderType} from '../text-rendering/render-type.enum';
import {CommandContext} from './command-context';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {StringHelper} from '../utility/string-helper';
import {CommandToken} from './parser/command-token';
import {TokenClassification} from './parser/token-classification.enum';
import {CommandResult} from './command-result';
import {Actor} from './entities/actor';
import {WorldEntity} from './entities/world-entity';
import {Room} from './entities/room';
import {LoggingService} from '../utility/logging.service';
import {ConfirmationService} from 'primeng/primeng';
import {TextLine} from '../text-rendering/text-line';
import {LexiconService} from './parser/lexicon.service';
import {CommonVerbService} from './verbs/common-verb.service';
import {ArrayHelper} from '../utility/array-helper';
import {SentenceParser} from './parser/sentence-parser';
import {NaturalLanguageProcessor} from './parser/natural-language-processor';
import {EntityResolver} from './entity-resolver';

export class InteractiveFictionEngine {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.41';
  engineAuthor: string = '[Matt Eland](http://www.matteland.com/)';
  copyrightText: string = 'Copyright © 2017 Matt Eland';
  licenseText: string = 'All rights reserved.';
  movesTaken: number = 0;
  commandId: number = 0;
  currentScore: number = 0;
  maxScore: number = 0;

  story: Story;
  gameStateChanged: EventEmitter<GameState>;
  commandEvaluated: EventEmitter<Command>;
  clearOutputRequested: EventEmitter<void>;
  linesAdded: EventEmitter<TextLine[]>;

  private verbHandlers: VerbHandler[];
  private _gameState: GameState = GameState.initializing;
  private _processor: NaturalLanguageProcessor;

  constructor(private confirmService: ConfirmationService) {
    this.verbHandlers = [];
    this.commandEvaluated = new EventEmitter<Command>();
    this.gameStateChanged = new EventEmitter<GameState>();
    this.clearOutputRequested = new EventEmitter<void>();
    this.linesAdded = new EventEmitter<TextLine[]>();
    this._processor = new NaturalLanguageProcessor();
  }

  get nlp(): NaturalLanguageProcessor {
    return this._processor;
  }

  initialize(story: Story) {
    LoggingService.instance.log('System Initialized');

    this.clearOutputRequested.emit();
    this.verbHandlers.length = 0;

    this.gameState = GameState.initializing;

    InteractiveFictionEngine.initializeEngine();
    this.initializeStory(story);
  }

  describeRoom(room: Room, context: CommandContext): void {

    if (!room.hasLight(context)) {
      InteractiveFictionEngine.describeDarkRoom(context);
      return;
    }

    context.output.addRoomName(room.name);
    context.output.addBlankLine();

    if (!room.invokeVerbResponse(context, 'look',  room)) {
      context.output.addStory(`This area is wholly unremarkable.`);
    }

    // Now list all notable items that are present here
    const notableItems: WorldEntity[] = room.contents.filter(e => e.shouldDescribeWithRoom(context));
    for (const entity of notableItems) {
      context.output.addBlankLine();
      context.output.addStory(entity.getInRoomDescription(context));
    }

  }

  static describeDarkRoom(context: CommandContext): void {

    const darkName = context.currentRoom.getAttribute('darkName', 'The Dark');
    const darkDesc = context.currentRoom.getAttribute('darkDescription', 'It is pitch black, and you can\'t see a thing.');

    context.output.addRoomName(darkName);
    context.output.addBlankLine();
    context.output.addStory(darkDesc);

  }

  handleUserCommand(command: Command, context: CommandContext): CommandResult {

    // Validate input
    if (!command) {
      throw new Error('Can\'t respond to a command that isn\'t there.');
    }

    // Increment our command counter
    this.commandId += 1;

    // Find the requisite verb handler for the item in question
    command.verbHandler = this.getVerbHandler(command.verb);

    const initialRoom: Room = context.player.currentRoom;

    const result: CommandResult = command.execute(context);

    if (!this.isGameOver) {

      // If we changed rooms, describe the new room now
      if (initialRoom !== context.player.currentRoom) {
        this.describeRoom(context.player.currentRoom, context);
      }

      // Increment our counter
      if (result && result.countsAsMove) {
        this.movesTaken += 1;
      }

    }
    command.result = result;

    return result;

  }

  logUserCommandToAnalytics(context: CommandContext, command: Command): void {

    GoogleAnalyticsService.instance.emitEvent(
      'User Command',
      command.userInput,
      `${context.story.name} - ${context.currentRoom.name}`,
      this.commandId);

  }

  buildCommandContext(): CommandContext {
    return new CommandContext(this, this.confirmService);
  }

  setActorRoom(actor: Actor, room: Room): void {

    if (!actor) {
      throw new Error(`Actor is required but was null`);
    }
    if (!room) {
      throw new Error(`Room is required but was null`);
    }

    const oldRoom: Room = actor.currentRoom;

    // Calling remove and add object methods ensures that token lookup remains accurate
    if (oldRoom) {
      oldRoom.removeObject(actor);
    }
    if (room) {
      room.addObject(actor);
    }
    actor.parent = room;

    // Log it to the console for debug purposes
    LoggingService.instance.log(`${actor.name} has been moved to ${room.name}.`);
    LoggingService.instance.log(room);

  }

  restartStory(): void {

    // Clear the output area and emit some new placeholder text
    this.clearOutputRequested.emit();
    this.linesAdded.emit([
      new TextLine(`Restarting story...`, RenderType.engine),
      new TextLine(``, RenderType.divider)
    ]);

    this.story.restart();

    this.beginStory(this.story);

  }

  get gameState(): GameState {
    return this._gameState;
  }

  set gameState(value: GameState) {
    this._gameState = value;
    this.gameStateChanged.emit(value);
  }

  get isGameOver(): boolean {
    return this.gameState !== GameState.underway;
  }

  handleUserSentence(sentence: string): CommandResult {

    // This is for exception handling testing
    if (sentence === 'throw error') {
      throw new Error('By your command.');
    }

    const context: CommandContext = this.buildCommandContext();

    // Break the user's input down to tokens with parts of speech defined. This will also perform smart-replacement.
    const tokens = this.extractTokensFromInput(sentence);

    // Now that we know what the user said, try to figure out what it means
    const command: Command = SentenceParser.buildCommandFromSentenceTokens(sentence, tokens, context);

    const isDebugCommand: boolean = command.verb && (command.verb.name === 'debug' || command.verb.name === 'reportbug');
    if (isDebugCommand) {
      LoggingService.instance.debug('Command recognized as a debugging command');
    }

    context.output.addLine(sentence, RenderType.userInput, command);

    // At this point, we shouldn't have tokens coming in that we can't even classify, but check to be sure
    const unknowns: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Unknown);
    if (unknowns && unknowns.length > 0 && !isDebugCommand) {
      InteractiveFictionEngine.displayParserError(unknowns, context);

      const unknownResult = CommandResult.BuildParseFailedResult();
      unknownResult.command = command;
      unknownResult.lines = ArrayHelper.clone(context.output.lines);
      return unknownResult;
    }

    // Now that we know the basic sentence structure, let's look at the execution context and see if we can't identify what tokens map to.
    EntityResolver.resolveDirections(context, tokens);
    EntityResolver.resolveNouns(context, tokens, !isDebugCommand);

    // Create a command context. This will give the command handler more utility information
    this.logUserCommandToAnalytics(context, command);

    // If the parser wasn't sure what we were referring to with something, then don't send it to a verb handler.
    let result: CommandResult;
    if (context.wasConfused && !(isDebugCommand)) {
      console.warn('result was confused');
      result = CommandResult.BuildParseFailedResult();
    } else {
      // Okay, we can send the command off to be interpreted and just return the result
      result = this.handleUserCommand(command, context);
    }

    result.command = command;
    result.lines = ArrayHelper.clone(context.output.lines);

    command.result = result;

    // Copy the output to the window
    this.linesAdded.emit(context.output.lines);
    this.commandEvaluated.emit(command);

    return result;

  }

  endGame(context: CommandContext, isVictory: boolean, message: string = null) {

    if (isVictory) {
      this.gameState = GameState.won;
    } else {
      this.gameState = GameState.lost;
    }

    if (!message) {
      if (isVictory) {
        message = 'You have won!!!';
      } else {
        message = 'You have lost.';
      }
    }

    // We need to emit here instead of just add to the context because there may be confirms behind this (on give up, for example)
    // I
    this.linesAdded.emit([
      new TextLine('', RenderType.divider),
      new TextLine(message, RenderType.gameOver, isVictory),
      new TextLine('', RenderType.divider)
    ]);

    GoogleAnalyticsService.instance.emitEvent(
      'Game Over',
      message,
      `${this.story.name} - ${this.story.player.currentRoom.name}`,
      this.currentScore);

  }

  increaseScore(context: CommandContext, amount: number = 1): number {

    this.currentScore += amount;

    // Tell the user how awesome they're doing
    context.output.addBlankLine();
    context.output.addSuccessAction(`Your score has just gone up by ${StringHelper.pluralize(amount, 'point', 'points')}.`);

    return this.currentScore;

  }

  decreaseScore(context: CommandContext, amount: number = 1): number {

    this.currentScore += amount;

    // Tell the user how awesome they're doing
    context.output.addBlankLine();
    context.output.addSuccessAction(`Your score has just gone down by ${StringHelper.pluralize(amount, 'point', 'points')}.`);

    return this.currentScore;

  }

  private static displayHeadingAndIntro(story: Story, context: CommandContext) {

    context.output.addLine(story.name, RenderType.header, `v${story.version}`);

    if (story.authors) {
      context.output.addLine(story.authors, RenderType.author);
    }
    if (story.description) {
      context.output.addLine(story.description, RenderType.subtitle);
    }

    context.output.addBlankLine();

    story.displayIntroduction(context);

    context.output.addBlankLine();

  }

  private getVerbHandler(verbToken: CommandToken): VerbHandler {

    // It's quite possible to have a sentence without a verb.
    if (!verbToken) {
      return null;
    }

    if (verbToken.classification !== TokenClassification.Verb) {
      LoggingService.instance.error(`Asked to get a verb handler for the non-verb token '${verbToken.name}' (${verbToken.classification})`);
      return null;
    }

    for (const handler of this.verbHandlers) {
      if (handler.canHandleVerb(verbToken)) {
        return handler;
      }
    }

    return null;
  }

  private static initializeEngine() {
    LexiconService.instance.useDefaults(); // TODO: Reduce reliance on lex service
  }

  private initializeStory(story: Story) {

    this.gameState = GameState.initializing;

    // Import the common set of verbs
    for (const verb of CommonVerbService.getCommonVerbs()) {
      story.verbHandlers.push(verb);
    }

    // Boot up the story world
    story.initialize();

    this.beginStory(story);
  }

  private beginStory(story: Story) {

    this.story = story;

    this.movesTaken = 0;
    this.currentScore = 0;
    this.maxScore = story.maxScore;

    // Grab verb handlers from the story.
    this.verbHandlers.length = 0;
    for (const verb of story.verbHandlers) {
      // LoggingService.instance.log(`Loaded verb handler: ${verb.name}`);
      this.verbHandlers.push(verb);
    }

    // Display the story header and introduction
    const context = this.buildCommandContext();
    InteractiveFictionEngine.displayHeadingAndIntro(story, context);

    // Now that we're ready to begin properly, validate
    if (!story.player || !story.player.currentRoom) {
      throw new Error('The player must be initialized and have a starting room when the story begins!');
    }

    this.describeRoom(story.player.currentRoom, context);

    this.linesAdded.emit(context.output.lines);

    this.gameState = GameState.underway;
  }

  private static displayParserError(unknowns: CommandToken[], context: CommandContext): void {

    // Tell the user they're full of it
    if (unknowns && unknowns.length === 1) {
      context.output.addParserError(`I don't know what ${unknowns[0].userInput} means.`);
    } else {
      let friendlyText: string;
      friendlyText = StringHelper.toOxfordCommaList(unknowns.map(u => u.userInput), 'or');
      context.output.addParserError(`I don't know what ${friendlyText} mean.`);
    }

    // Log each unknown token to Google Analytics
    for (const token of unknowns) {

      GoogleAnalyticsService.instance.emitEvent(
        'Unknown Token',
        token.name,
        `${context.story.name} - ${context.currentRoom.name}`);

    }

  }

  private extractTokensFromInput(sentence: string): CommandToken[] {

    // Log it to console and stick the command into the main window for user reference
    LoggingService.instance.log(`Input sentence: '${sentence}'`);

    const lexer = LexiconService.instance;

    sentence = lexer.replaceWords(sentence);

    // Break down the input into command tokens
    const tokens: CommandToken[] = this.nlp.getTokensForSentence(sentence);

    // Some tokens are shortcuts for common actions. These should be replaced as if the user had spoken the full word.
    lexer.replaceTokens(tokens, this.nlp);

    return tokens;
  }
}
