import { Injectable } from '@angular/core';
import {TextOutputService} from './text-output.service';
import {LoggingService} from './logging.service';
import {Story} from './stories/story';

@Injectable()
export class InteractiveFictionService {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.1';
  engineAuthor: string = 'Matt Eland';
  copyrightText: string = 'Copyright (c) 2017 Matt Eland';
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
    this.outputService.displaySystemText(`${this.engineName} v${this.engineVersion} by ${this.engineAuthor}`);
    this.outputService.displayBlankLine();
    this.outputService.displaySystemText(this.copyrightText);
    this.outputService.displaySystemText(this.licenseText);
    this.outputService.displayBlankLine();
  }

  private initializeStory(story: Story) {

    this.story = story;
    this.outputService.displaySystemText(`${story.title} v${story.version}`);
    this.outputService.displaySystemText(`by ${story.author}`);
    this.outputService.displayBlankLine();
  }
}
