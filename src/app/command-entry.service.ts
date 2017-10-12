import { Injectable } from '@angular/core';
import {LoggingService} from './logging.service';

@Injectable()
export class CommandEntryService {

  private _logger: LoggingService;

  constructor(loggingService: LoggingService) {
    this._logger = loggingService;
  }

  parseInput(sentence: string) {
    this._logger.log(`User typed in '${sentence}'`);
  }

}
