import { Injectable } from '@angular/core';
import {LoggingService} from './logging.service';
import {TextOutputService} from './text-output.service';

@Injectable()
export class CommandEntryService {

  private _logger: LoggingService;
  private _outputService: TextOutputService;

  constructor(loggingService: LoggingService,
              outputService: TextOutputService) {
    this._logger = loggingService;
    this._outputService = outputService;
  }

  parseInput(sentence: string) {

    this._logger.log(`Input sentence: '${sentence}'`);

    this._outputService.displayUserCommand(sentence);
  }

}
