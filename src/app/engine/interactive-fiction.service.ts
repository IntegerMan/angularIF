import { Injectable } from '@angular/core';
import {TextOutputService} from './text-output.service';
import {LoggingService} from '../logging.service';
import {Story} from './story';
import {Room} from './room';
import {Player} from './player';
import {TokenizerService} from './tokenizer/tokenizer.service';
import {CommandToken} from './tokenizer/command-token';
import {TokenClassification} from './tokenizer/token-classification.enum';
import {CommonDictionary} from './tokenizer/common-dictionary';
import {LexiconService} from './tokenizer/lexicon.service';
import {SentenceParserService} from './tokenizer/sentence-parser.service';
import {Command} from './tokenizer/command';
import {VerbHandler} from './verbs/verb-handler';
import {CommandContext} from './command-context';
import {NavigationService} from './navigation.service';
import {WorldEntity} from './world-entity';

@Injectable()
export class InteractiveFictionService {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.1';
  engineAuthor: string = 'Matt Eland';
  copyrightText: string = 'Copyright © 2017 Matt Eland';
  licenseText: string = 'All rights reserved.';

  story: Story;

  private verbHandlers: VerbHandler[];

  constructor(private logger: LoggingService,
              private tokenizer: TokenizerService,
              private sentenceParser: SentenceParserService,
              private outputService: TextOutputService,
              private navService: NavigationService,
              private lexer: LexiconService) {

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

    // Ensure the story has the base dictionary at least
    story.addDictionary(new CommonDictionary(this.lexer));

    story.initialize();

    this.story = story;
    this.outputService.displayTitle(story.title, `v${story.version}`);
    if (story.author.indexOf('Unattributed') < 0) {
      this.outputService.displaySubtitle(`Written by ${story.author}`);
    }
    this.outputService.displayBlankLine();

    // Grab verb handlers from the story.
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

    this.outputService.displayRoomName(room.name);
    this.outputService.displayBlankLine();
    this.outputService.displayStory(room.getExamineDescription(context, isScrutinize));

    // Now list all notable items that are present here
    const notableItems: WorldEntity[] = room.contents.filter(e => e.shouldDescribeWithRoom(context));
    for (const entity of notableItems) {
      this.outputService.displayBlankLine();
      this.outputService.displayStory(entity.getInRoomDescription(context, isScrutinize));
    }

  }

  public handleUserCommand(command: Command): boolean {

    // Validate input
    if (!command) {
      throw new Error('Can\'t respond to a command that isn\'t there.');
    }

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
      this.outputService.displayParserError(`I don't know how to respond to the verb '${command.verb.name}' yet.`);
      return false;
    }

    // Create a command context. This will give the command handler more utility information
    const context: CommandContext = this.buildCommandContext();

    // TODO: This will likely need a command context
    return verbHandler.handleCommand(command, context);
  }

  buildCommandContext(): CommandContext {
    return new CommandContext(this.story, this, this.outputService, this.navService, this.logger);
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
}
