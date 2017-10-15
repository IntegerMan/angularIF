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

@Injectable()
export class InteractiveFictionService {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.1';
  engineAuthor: string = 'Matt Eland';
  copyrightText: string = 'Copyright &copy; 2017 Matt Eland';
  licenseText: string = 'All rights reserved.';

  story: Story;

  private isDebugMode: boolean = true;
  private verbHandlers: VerbHandler[];

  constructor(private logger: LoggingService,
              private tokenizer: TokenizerService,
              private sentenceParser: SentenceParserService,
              private outputService: TextOutputService,
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

    this.outputService.displayTitle(`${this.engineName}`);
    this.outputService.displaySubtitle(`v${this.engineVersion} by ${this.engineAuthor}`);
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
    this.outputService.displayTitle(`${story.title} v${story.version}`);
    this.outputService.displaySubtitle(`by ${story.author}`);
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

    this.describeRoom(story.player, story.player.currentRoom);
  }

  private describeRoom(player: Player, room: Room) {

    this.outputService.displayRoomName(room.name);
    this.outputService.displayBlankLine();
    this.outputService.displayStory(room.description);

  }

  public handleUserCommand(command: Command): boolean {

    // Validate input
    if (!command) {
      throw new Error('Can\'t respond to a command that isn\'t there');
    }

    this.logger.log(`Handling command associated with sentence ${command.userInput}`);
    this.logger.log(command);

    // Allow us to easily see how sentences are being structured, should we desire
    if (this.isDebugMode) {
      this.outputService.displaySentenceDebugInfo(command);
    }

    // We have to have a verb here
    if (!command.verb) {
      this.outputService.displayParserError('I couldn\'t figure out what you want me to do. Try starting your command with a verb.');
      return false;
    }

    const verbHandler: VerbHandler = this.getVerbHandler(command.verb);

    // TODO: Look up the verb to see if we have something registered to handle it

    // If we don't have a verb handler for the verb in question, display a generic error message
    if (!verbHandler) {
      this.outputService.displayParserError(`I don't know how to respond to the verb '${command.verb.name}' yet. Try something else.`);
      return false;
    }

    // TODO: Execute the verb handler, now that we know we have something that can take in the sentence

    this.logger.log('The engine cannot currently respond to commands');
    return false;
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

}
