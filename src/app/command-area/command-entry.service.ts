import { Injectable } from '@angular/core';
import {LoggingService} from '../logging.service';
import {TextOutputService} from '../engine/text-output.service';
import {InteractiveFictionService} from '../engine/interactive-fiction.service';

@Injectable()
export class CommandEntryService {

  constructor(private logger: LoggingService,
              private outputService: TextOutputService,
              private ifService: InteractiveFictionService) {
  }

  parseInput(sentence: string) {

    this.ifService.handleUserSentence(sentence);

  }

}
