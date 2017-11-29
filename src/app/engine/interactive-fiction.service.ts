import {EventEmitter, Injectable} from '@angular/core';
import {TextOutputService} from './text-output.service';
import {LoggingService} from '../utility/logging.service';
import {Story} from './entities/story';
import {Room} from './entities/room';
import {Actor} from './entities/actor';
import {NaturalLanguageService} from './parser/natural-language.service';
import {CommandToken} from './parser/command-token';
import {TokenClassification} from './parser/token-classification.enum';
import {LexiconService} from './parser/lexicon.service';
import {SentenceParserService} from './parser/sentence-parser.service';
import {Command} from './parser/command';
import {VerbHandler} from './verbs/verb-handler';
import {CommandContext} from './command-context';
import {WorldEntity} from './entities/world-entity';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {ConfirmationService} from 'primeng/primeng';
import {StateService} from './state.service';
import {ScoreService} from './score.service';
import {CommandResult} from './command-result';
import {GameState} from './game-state.enum';
import {TemplatingService} from './parser/templating.service';
import {CommonVerbService} from './verbs/common-verb.service';

@Injectable()
export class InteractiveFictionService {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.41';
  engineAuthor: string = '[Matt Eland](http://www.matteland.com/)';
  copyrightText: string = 'Copyright © 2017 Matt Eland';
  licenseText: string = 'All rights reserved.';
  movesTaken: number = 0;
  commandId: number = 0;

  story: Story;
  commandEvaluated: EventEmitter<Command>;
  gameStateChanged: EventEmitter<GameState>;

  private _gameState: GameState = GameState.initializing;
  private verbHandlers: VerbHandler[];

  constructor(private logger: LoggingService,
              private tokenizer: NaturalLanguageService,
              private sentenceParser: SentenceParserService,
              private outputService: TextOutputService,
              private lexer: LexiconService,
              private confirmService: ConfirmationService,
              private templatingService: TemplatingService,
              private verbService: CommonVerbService,
              private analytics: GoogleAnalyticsService,
              private stateService: StateService,
              private scoreService: ScoreService) {

    // Ensure we start with a unique empty list
    this.verbHandlers = [];
    this.commandEvaluated = new EventEmitter<Command>();
    this.gameStateChanged = new EventEmitter<GameState>();

  }

  initialize(story: Story) {
    this.logger.log('System Initialized');

    this.outputService.clear();
    this.verbHandlers.length = 0;

    this.gameState = GameState.initializing;

    this.initializeEngine();
    this.initializeStory(story);
  }

  describeRoom(room: Room, context: CommandContext): void {

    if (!room.hasLight(context)) {
      this.describeDarkRoom(context);
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

  describeDarkRoom(context: CommandContext): void {

    const darkName = context.currentRoom.getAttribute('darkName', 'The Dark');
    const darkDesc = context.currentRoom.getAttribute('darkDescription', 'It is pitch black, and you can\'t see a thing.');

    context.output.addRoomName(darkName);
    context.output.addBlankLine();
    context.output.addStory(darkDesc);

  }

  public handleUserCommand(command: Command, context: CommandContext): CommandResult {

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

    this.outputService.addLines(context.output.lines);

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

    this.commandEvaluated.emit(command);

    return result;

  }

  logUserCommandToAnalytics(context: CommandContext, command: Command): void {

    this.analytics.emitEvent(
      'User Command',
      command.userInput,
      `${context.story.name} - ${context.currentRoom.name}`,
      this.commandId);

  }

  buildCommandContext(): CommandContext {
    return new CommandContext(
      this,
      this.confirmService,
      this.templatingService,
      this.stateService,
      this.scoreService);
  }

  setActorRoom(actor: Actor, room: Room): void {

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
    this.logger.log(`${actor.name} has been moved to ${room.name}.`);
    this.logger.log(room);

  }

  restartStory(): void {

    this.outputService.clear();
    this.outputService.displaySystem('Restarting story...');
    this.outputService.displayBlankLine();

    this.story.restart();

    this.beginStory(this.story);

  }

  get currentScore(): number {
    return this.scoreService.currentScore;
  }

  get maxScore(): number {
    return this.scoreService.maxScore;
  }

  endGame(isVictory: boolean, message: string = null) {

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

    this.outputService.displayBlankLine();
    this.outputService.displayGameOver(message, isVictory);
    this.outputService.displayBlankLine();

    this.analytics.emitEvent(
      'Game Over',
      message,
      `${this.story.name} - ${this.story.player.currentRoom.name}`,
      this.scoreService.currentScore);

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

  private displayHeadingAndIntro(story: Story, context: CommandContext) {

    this.outputService.displayTitle(story.name, `v${story.version}`);

    if (story.authors) {
      this.outputService.displayAuthor(story.authors);
    }
    if (story.description) {
      this.outputService.displaySubtitle(story.description);
    }

    this.outputService.displayBlankLine();

    story.displayIntroduction(context);

    this.outputService.displayBlankLine();

  }

  private getVerbHandler(verbToken: CommandToken): VerbHandler {

    // It's quite possible to have a sentence without a verb.
    if (!verbToken) {
      return null;
    }

    if (verbToken.classification !== TokenClassification.Verb) {
      this.logger.error(`Asked to get a verb handler for the non-verb token '${verbToken.name}' (${verbToken.classification})`);
      return null;
    }

    for (const handler of this.verbHandlers) {
      if (handler.canHandleVerb(verbToken)) {
        return handler;
      }
    }

    return null;
  }


  private initializeEngine() {

    this.lexer.useDefaults();

    /*
    this.outputService.displayTitle(`${this.engineName}`, `v${this.engineVersion}`);
    this.outputService.displayAuthor(`Developed by ${this.engineAuthor}`);
    this.outputService.displayBlankLine();
    this.outputService.displaySystem(this.copyrightText);
    this.outputService.displaySystem(this.licenseText);
    this.outputService.displayBlankLine();
    */
  }

  private initializeStory(story: Story) {

    this.gameState = GameState.initializing;

    // Import the common set of verbs
    // TODO: It'd be nice to move this out of IF service and closer to the story instantiation
    for (const verb of this.verbService.getCommonVerbs()) {
      story.verbHandlers.push(verb);
    }

    // Boot up the story world
    story.initialize();

    this.beginStory(story);
  }

  private beginStory(story: Story) {

    this.story = story;

    this.movesTaken = 0;
    this.stateService.clear();
    this.scoreService.currentScore = 0;
    this.scoreService.maxScore = story.maxScore;

    // Grab verb handlers from the story.
    this.verbHandlers.length = 0;
    for (const verb of story.verbHandlers) {
      // this.logger.log(`Loaded verb handler: ${verb.name}`);
      this.verbHandlers.push(verb);
    }

    // Display the story header and introduction
    const context = this.buildCommandContext();
    this.displayHeadingAndIntro(story, context);

    // Now that we're ready to begin properly, validate
    if (!story.player || !story.player.currentRoom) {
      throw new Error('The player must be initialized and have a starting room when the story begins!');
    }

    this.describeRoom(story.player.currentRoom, this.buildCommandContext());

    this.gameState = GameState.underway;
  }

}
