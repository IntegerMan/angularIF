import { Injectable } from '@angular/core';
import {UserInputService} from '../../engine/user-input.service';
import {TextOutputService} from '../../engine/text-output.service';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {CloakStory} from './cloak-story';
import {CommandContext} from '../../engine/command-context';
import {GameState} from '../../engine/game-state.enum';
import {Room} from '../../engine/entities/room';
import {Actor} from '../../engine/entities/actor';
import {CommandResult} from '../../engine/command-result';
import {TextLine} from '../../text-rendering/text-line';

@Injectable()
export class CloakTestingService {

  story: CloakStory;
  private context: CommandContext;

  constructor(private ifService: InteractiveFictionService,
              private inputService: UserInputService,
              private outputService: TextOutputService) {

  }

  initialize(): CloakStory {
    this.story = new CloakStory();

    this.ifService.initialize(this.story);
    this.context = this.ifService.buildCommandContext();

    return this.story;
  }

  input(sentence: string): CommandResult {
    return this.inputService.handleUserSentence(sentence);
  }

  get maxScore(): number {
    return this.ifService.maxScore;
  }

  get currentScore(): number {
    return this.ifService.currentScore;
  }

  get gameState(): GameState {
    return this.ifService.gameState;
  }

  get currentRoom(): Room {
    return this.context.currentRoom;
  }

  get player(): Actor {
    return this.context.player;
  }

  get lastReply(): String {
    return this.lastReplyLine.text;
  }

  get lastReplyLine(): TextLine {
    return this.outputService.lastLine;
  }

}
