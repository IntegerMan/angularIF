import { Injectable } from '@angular/core';
import {UserInputService} from '../engine/user-input.service';
import {LoggingService} from '../logging.service';

@Injectable()
export class CommandEntryService {

  constructor(private inputService: UserInputService,
              private logger: LoggingService) {
  }

  parseInput(sentence: string) {

    const result: any = this.inputService.handleUserSentence(sentence);

    this.logger.log(`Command execution resulted in a result of ${result}`);

  }

}
