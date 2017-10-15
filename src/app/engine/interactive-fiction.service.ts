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

@Injectable()
export class InteractiveFictionService {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.1';
  engineAuthor: string = 'Matt Eland';
  copyrightText: string = 'Copyright &copy; 2017 Matt Eland';
  licenseText: string = 'All rights reserved.';

  story: Story;

  private isDebugMode: boolean = true;

  constructor(private logger: LoggingService,
              private tokenizer: TokenizerService,
              private sentenceParser: SentenceParserService,
              private outputService: TextOutputService,
              private lexer: LexiconService) {

  }

  initialize(story: Story) {
    this.logger.log('System Initialized');

    this.outputService.clear();

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

    // TODO: Check to see if we have a registered verb handler for the requested verb (or one of its synonyms, perhaps)

    this.logger.log('The engine cannot currently respond to commands');
    return false;
  }
}
