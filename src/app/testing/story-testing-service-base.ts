import {InteractiveFictionService} from '../engine/interactive-fiction.service';
import {UserInputService} from '../engine/user-input.service';
import {Story} from '../engine/entities/story';
import {CommandContext} from '../engine/command-context';
import {CommandResult} from '../engine/command-result';
import {Actor} from '../engine/entities/actor';
import {TextLine} from '../text-rendering/text-line';
import {Room} from '../engine/entities/room';
import {GameState} from '../engine/game-state.enum';
import {isNullOrUndefined} from 'util';
import {EntitySpec} from './entity-spec';
import {RoomSpec} from './room-spec';
import {EntityBase} from '../engine/entities/entity-base';
import {ArrayHelper} from '../utility/array-helper';

export class StoryTestingServiceBase {

  story: Story;
  context: CommandContext;
  lines: TextLine[];

  lastInput: string = '';

  constructor(protected ifService: InteractiveFictionService,
              protected inputService: UserInputService) {

    this.lines = [];

  }

  initialize(story: Story): Story {

    this.story = story;
    this.ifService.initialize(this.story);
    this.context = this.ifService.buildCommandContext();

    return this.story;
  }

  input(sentence: string): CommandResult {
    this.lastInput = sentence;
    const result = this.inputService.handleUserSentence(sentence);

    if (result && result.lines) {
      this.lines = ArrayHelper.clone(result.lines);
    }

    return result;
  }

  warpTo(roomKey: string, describe: boolean = true): Room {

    this.ifService.setActorRoom(this.player, this.story.findRoomByKey(roomKey));
    this.context = this.ifService.buildCommandContext();

    if (describe) {
      this.ifService.describeRoom(this.player.currentRoom, this.context);
    }

    return this.player.currentRoom;
  }

  getEntityFromResult(result: CommandResult, key: string = null): EntityBase {
    const tokens = result.command.objects.filter(o => o.entity &&  (isNullOrUndefined(key) || o.entity.key === key));
    if (tokens && tokens.length > 0)  {
      return tokens[0].entity;
    }

    return null;
  }

  lookForEntity(description: string, key: string = null): EntityBase {
    const result = this.input(`x ${description}`);
    return this.getEntityFromResult(result, key);
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

  get lastReply(): string {
    return this.lastReplyLine.text;
  }

  get lastReplyLine(): TextLine {

    if (this.lines.length <= 0) {
      return null;
    }

    return this.lines[this.lines.length - 1];

  }

  buildEntitySpec(key: string, room: Room): EntitySpec {
    return new EntitySpec(key, room, this);
  }

  buildRoomSpec(key: string, room: Room): RoomSpec {
    return new RoomSpec(key, room, this);
  }

}
