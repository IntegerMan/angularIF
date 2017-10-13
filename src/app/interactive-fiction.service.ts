import { Injectable } from '@angular/core';
import {TextOutputService} from './text-rendering/text-output.service';
import {LoggingService} from './logging.service';
import {Story} from './engine/story';
import {Room} from './engine/room';
import {Player} from './engine/player';

@Injectable()
export class InteractiveFictionService {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.1';
  engineAuthor: string = 'Matt Eland';
  copyrightText: string = 'Copyright &copy; 2017 Matt Eland';
  licenseText: string = 'All rights reserved.';

  story: Story;

  constructor(private outputService: TextOutputService,
              private logger: LoggingService) {

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

}
