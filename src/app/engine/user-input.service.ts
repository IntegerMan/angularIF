import { Injectable } from '@angular/core';
import {CommandResult} from './command-result';
import {InteractiveFictionService} from './interactive-fiction.service';

@Injectable()
export class UserInputService {

  constructor(private ifService: InteractiveFictionService) { }

  public handleUserSentence(sentence: string): CommandResult {
    return this.ifService.engine.handleUserSentence(sentence);
  }

}
