import { Injectable } from '@angular/core';
import {UserInputService} from '../engine/user-input.service';
import {LoggingService} from '../utility/logging.service';
import {CommandResult} from '../engine/command-result';

@Injectable()
export class CommandEntryService {

  constructor(private inputService: UserInputService,
              private logger: LoggingService) {
  }

  parseInput(sentence: string) {

    const result: CommandResult = this.inputService.handleUserSentence(sentence);
    this.logger.debug(result);

  }

}
