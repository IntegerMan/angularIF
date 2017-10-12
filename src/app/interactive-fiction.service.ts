import { Injectable } from '@angular/core';
import {TextOutputService} from './text-output.service';
import {LoggingService} from './logging.service';

@Injectable()
export class InteractiveFictionService {

  engineName: string = 'Angular Interactive Fiction Engine';
  engineVersion: string = '0.1';
  engineAuthor: string = 'Matt Eland';
  copyrightText: string = 'Copyright (c) 2017 Matt Eland';
  licenseText: string = 'All rights reserved.';

  constructor(private outputService: TextOutputService,
              private logger: LoggingService) {

  }

  initialize() {
    this.logger.log('System Initialized');

    this.outputService.clear();

    this.initializeEngine();
  }

  private initializeEngine() {
    this.outputService.displaySystemText(`${this.engineName} v${this.engineVersion}`);
    this.outputService.displaySystemText(`Developed by ${this.engineAuthor}`);
    this.outputService.displayBlankLine();
    this.outputService.displaySystemText(this.copyrightText);
    this.outputService.displayBlankLine();
    this.outputService.displaySystemText(this.licenseText);
    this.outputService.displayBlankLine();
  }
}
