import {EventEmitter, Injectable} from '@angular/core';
import {TextOutputService} from './text-output.service';
import {LoggingService} from '../utility/logging.service';
import {Story} from './entities/story';
import {Room} from './entities/room';
import {Player} from './entities/player';
import {TokenizerService} from './parser/tokenizer.service';
import {CommandToken} from './parser/command-token';
import {TokenClassification} from './parser/token-classification.enum';
import {CommonDictionary} from './parser/common-dictionary';
import {LexiconService} from './parser/lexicon.service';
import {SentenceParserService} from './parser/sentence-parser.service';
import {Command} from './parser/command';
import {VerbHandler} from './verbs/verb-handler';
import {CommandContext} from './command-context';
import {NavigationService} from './navigation.service';
import {WorldEntity} from './entities/world-entity';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {ConfirmationService} from 'primeng/primeng';
import {StateService} from './state.service';
import {ScoreService} from './score.service';
import {CommandResult} from './command-result';

@Injectable()
export class InteractiveFictionService {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.3';
  engineAuthor: string = 'Matt Eland';
  copyrightText: string = 'Copyright © 2017 Matt Eland';
  licenseText: string = 'All rights reserved.';
  movesTaken: number = 0;
  commandId: number = 0;
  isGameOver: boolean = false;

  story: Story;

  commandEvaluated: EventEmitter<Command>;

  private verbHandlers: VerbHandler[];

  constructor(private logger: LoggingService,
              private tokenizer: TokenizerService,
              private sentenceParser: SentenceParserService,
              private outputService: TextOutputService,
              private navService: NavigationService,
              private lexer: LexiconService,
              private confirmService: ConfirmationService,
              private analytics: GoogleAnalyticsService,
              private stateService: StateService,
              private scoreService: ScoreService) {

    // Ensure we start with a unique empty list
    this.verbHandlers = [];
    this.commandEvaluated = new EventEmitter<Command>();

  }

  initialize(story: Story) {
    this.logger.log('System Initialized');

    this.outputService.clear();
    this.verbHandlers.length = 0;

    this.initializeEngine();
    this.initializeStory(story);
  }

  private initializeEngine() {

    this.outputService.displayTitle(`${this.engineName}`, `v${this.engineVersion}`);
    this.outputService.displayAuthor(`Developed by ${this.engineAuthor}`);
    this.outputService.displayBlankLine();
    this.outputService.displaySystem(this.copyrightText);
    this.outputService.displaySystem(this.licenseText);
    this.outputService.displayBlankLine();
  }

  private initializeStory(story: Story) {

    // Restart
    this.movesTaken = 0;
    this.stateService.clear();
    this.isGameOver = false;

    // Ensure the story has the base dictionary at least
    story.addDictionary(new CommonDictionary(this.lexer));

    // Boot up the story world
    story.initialize();

    // Set the initial score
    this.scoreService.currentScore = 0;
    this.scoreService.maxScore = story.maxScore;

    this.beginStory(story);
  }

  private beginStory(story: Story) {
    this.story = story;

    // Grab verb handlers from the story.
    this.verbHandlers.length = 0;
    for (const verb of story.verbHandlers) {
      this.logger.log(`Loaded verb handler: ${verb.name}`);
      this.verbHandlers.push(verb);
    }

    // Display the story header and introduction
    this.displayHeadingAndIntro(story);

    // Now that we're ready to begin properly, validate
    if (!story.player || !story.player.currentRoom) {
      throw new Error('The player must be initialized and have a starting room when the story begins!');
    }

    this.describeRoom(story.player.currentRoom, this.buildCommandContext());
  }

  private displayHeadingAndIntro(story: Story) {

    this.outputService.displayTitle(story.title, `v${story.version}`);

    if (story.author && story.author.indexOf('Unattributed') < 0) {
      // TODO: It'd be nice to be able to have this be a hyperlink to open in a new window
      this.outputService.displayAuthor(`Written by ${story.author}`);
    }
    if (story.description) {
      this.outputService.displaySubtitle(story.description);
    }

    this.outputService.displayBlankLine();

    story.displayIntroduction(this.outputService);

    this.outputService.displayBlankLine();

  }

  describeRoom(room: Room, context: CommandContext, isScrutinize: boolean = false): void {

    if (!room.hasLight(context)) {
      this.describeDarkRoom(context);
      return;
    }

    context.outputService.displayRoomName(room.name);
    context.outputService.displayBlankLine();
    context.outputService.displayStory(room.getExamineDescription(context, isScrutinize));

    // Now list all notable items that are present here
    const notableItems: WorldEntity[] = room.contents.filter(e => e.shouldDescribeWithRoom(context));
    for (const entity of notableItems) {
      context.outputService.displayBlankLine();
      context.outputService.displayStory(entity.getInRoomDescription(context, isScrutinize));
    }

  }

  describeDarkRoom(context: CommandContext): void {

    // TODO: Authors may need to be able to customize these at some point, but for now, this is fine.
    context.outputService.displayRoomName(`Darkness`);
    context.outputService.displayBlankLine();
    context.outputService.displayStory(`It is pitch dark, and you can't see a thing.`);

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

    const result: CommandResult = command.execute(context);

    if (result && result.countsAsMove) {
      this.movesTaken += 1;
    }
    command.result = result;

    this.commandEvaluated.emit(command);

    return result;

  }

  logUserCommandToAnalytics(context: CommandContext, command: Command): void {

    this.analytics.emitEvent(
      'User Command',
      command.userInput,
      `${context.story.title} - ${context.currentRoom.name}`,
      this.commandId);

  }

  buildCommandContext(): CommandContext {
    return new CommandContext(
      this,
      this.outputService,
      this.navService,
      this.confirmService,
      this.stateService,
      this.scoreService);
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

  setActorRoom(actor: Player, room: Room, isSilent: Boolean = false): void {

    const oldRoom: Room = actor.currentRoom;

    // Calling remove and add object methods ensures that token lookup remains accurate
    oldRoom.removeObject(actor);
    room.addObject(actor);

    // Log it to the console for debug purposes
    this.logger.log(`${actor.name} has been moved to ${room.name}.`);
    this.logger.log(room);

    // If it's the player and they changed rooms, describe their new location
    if (actor === this.story.player && room !== oldRoom && !isSilent) {
      this.describeRoom(room, this.buildCommandContext());
    }

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

    this.isGameOver = true;

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
      `${this.story.title} - ${this.story.player.currentRoom.name}`,
      this.scoreService.currentScore);

  }
}
