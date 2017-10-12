import { Injectable } from '@angular/core';
import {LoggingService} from './logging.service';
import {TextOutputService} from './text-output.service';

@Injectable()
export class CommandEntryService {

  constructor(private logger: LoggingService,
              private outputService: TextOutputService) {
  }

  parseInput(sentence: string) {

    this.logger.log(`Input sentence: '${sentence}'`);

    this.outputService.displayUserCommand(sentence);
  }

}
