import {InteractiveFictionService} from '../engine/interactive-fiction.service';
import {UserInputService} from '../engine/user-input.service';
import {TextOutputService} from '../engine/text-output.service';
import {Story} from '../engine/entities/story';
import {CommandContext} from '../engine/command-context';
import {CommandResult} from '../engine/command-result';
import {Actor} from '../engine/entities/actor';
import {TextLine} from '../text-rendering/text-line';
import {Room} from '../engine/entities/room';
import {GameState} from '../engine/game-state.enum';

export class StoryTestingServiceBase {

  story: Story;
  context: CommandContext;

  constructor(protected ifService: InteractiveFictionService,
              protected inputService: UserInputService,
              protected outputService: TextOutputService) {
  }

  initialize(story: Story): Story {

    this.story = story;
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
