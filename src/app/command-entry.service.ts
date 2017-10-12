import { Injectable } from '@angular/core';
import {LoggingService} from './logging.service';

@Injectable()
export class CommandEntryService {

  constructor(loggingService: LoggingService) { }

  parseInput(sentence: string) {
    this.loggingService.log(`User typed in '${sentence}'`);
  }

}
