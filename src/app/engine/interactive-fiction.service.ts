import { Injectable } from '@angular/core';
import {TextOutputService} from '../text-rendering/text-output.service';
import {LoggingService} from '../logging.service';
import {Story} from './story';
import {Room} from './room';
import {Player} from './player';
import {TokenizerService} from './tokenizer/tokenizer.service';
import {CommandToken} from './tokenizer/command-token';
import {TokenClassification} from './tokenizer/token-classification.enum';
import {CommonDictionary} from './tokenizer/common-dictionary';
import {LexiconService} from './tokenizer/lexicon.service';

@Injectable()
export class InteractiveFictionService {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.1';
  engineAuthor: string = 'Matt Eland';
  copyrightText: string = 'Copyright &copy; 2017 Matt Eland';
  licenseText: string = 'All rights reserved.';

  story: Story;

  constructor(private outputService: TextOutputService,
              private logger: LoggingService,
              private tokenizer: TokenizerService,
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

  handleUserSentence(sentence: string): void {

    // Log it to console and stick the command into the main window for user reference
    this.logger.log(`Input sentence: '${sentence}'`);
    this.outputService.displayUserCommand(sentence);

    // Break down the input into tokens
    const tokens: CommandToken[] = this.tokenizer.getTokensForSentence(sentence);
    for (const token of tokens) {

      this.logger.log(`Read in token '${token.name}' of type ${token.classification} from input '${token.userInput}'`);

    }

    const unknowns: CommandToken[] = tokens.filter(t => t.classification === TokenClassification.Unknown);
    if (unknowns && unknowns.length > 0) {

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
}
