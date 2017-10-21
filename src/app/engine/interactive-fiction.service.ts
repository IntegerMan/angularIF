import { Injectable } from '@angular/core';
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

@Injectable()
export class InteractiveFictionService {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.21';
  engineAuthor: string = 'Matt Eland';
  copyrightText: string = 'Copyright © 2017 Matt Eland';
  licenseText: string = 'All rights reserved.';

  story: Story;

  private verbHandlers: VerbHandler[];
  private commandId: number;

  constructor(private logger: LoggingService,
              private tokenizer: TokenizerService,
              private sentenceParser: SentenceParserService,
              private outputService: TextOutputService,
              private navService: NavigationService,
              private lexer: LexiconService,
              private confirmService: ConfirmationService,
              private analytics: GoogleAnalyticsService) {

    // Ensure we start with a unique empty list
    this.verbHandlers = [];

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
    this.outputService.displaySubtitle(`Developed by ${this.engineAuthor}`);
    this.outputService.displayBlankLine();
    this.outputService.displaySystem(this.copyrightText);
    this.outputService.displaySystem(this.licenseText);
    this.outputService.displayBlankLine();
  }

  private initializeStory(story: Story) {

    // Restart our numbering
    this.commandId = 0;

    // Ensure the story has the base dictionary at least
    story.addDictionary(new CommonDictionary(this.lexer));

    story.initialize();

    this.beginStory(story);
  }

  private beginStory(story: Story) {
    this.story = story;

    this.outputService.displayTitle(story.title, `v${story.version}`);
    if (story.author.indexOf('Unattributed') < 0) {
      this.outputService.displaySubtitle(`Written by ${story.author}`);
    }
    this.outputService.displayBlankLine();

    // Grab verb handlers from the story.
    this.verbHandlers.length = 0;
    for (const verb of story.verbHandlers) {
      this.logger.log(`Loaded verb handler: ${verb.name}`);
      this.verbHandlers.push(verb);
    }

    if (!story.player || !story.player.currentRoom) {
      // TODO: I need an exception handling service somewhere...
      throw new Error('The player must be initialized and have a starting room when the story begins!');
    }

    this.outputService.displayBlankLine();
    this.outputService.displayStory('The story begins...');
    this.outputService.displayBlankLine();

    this.describeRoom(story.player.currentRoom, this.buildCommandContext());
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

    // TODO: We may want story authors to be able to customize these at some point, but for now, this is fine.
    context.outputService.displayRoomName(`Darkness`);
    context.outputService.displayBlankLine();
    context.outputService.displayStory(`It is pitch dark, and you can't see a thing.`);

  }

  public handleUserCommand(command: Command, context: CommandContext): boolean {

    // Validate input
    if (!command) {
      throw new Error('Can\'t respond to a command that isn\'t there.');
    }

    // Increment our command counter
    this.commandId += 1;

    this.logger.log(`Handling command associated with sentence ${command.userInput}.`);
    this.logger.log(command);

    // We have to have a verb here
    if (!command.verb) {
      this.outputService.displayParserError('I couldn\'t figure out what you want to do. Try starting with a verb.');
      return false;
    }

    // Find the requisite verb handler for the item in question
    const verbHandler: VerbHandler = this.getVerbHandler(command.verb);

    // If we don't have a verb handler for the verb in question, display a generic error message
    if (!verbHandler) {

      this.analytics.emitEvent(
        'Unknown Verb',
        command.verb.name,
        `${context.story.title} - ${context.currentRoom.name}`,
        this.commandId);

      this.outputService.displayParserError(`I don't know how to respond to the verb '${command.verb.name}' yet.`);
      return false;
    }

    return verbHandler.handleCommand(command, context);
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
      this.confirmService);
  }

  private getVerbHandler(verbToken: CommandToken): VerbHandler {

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

}
