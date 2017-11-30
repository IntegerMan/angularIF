import {EntitySpec} from './entity-spec';
import {Room} from '../engine/entities/room';
import {StorySpecVerifier} from './story-spec-verifier';

export class RoomSpec extends EntitySpec {

  constructor(key: string, room: Room, testService: StorySpecVerifier) {
    super(key, room, testService);
  }

  public shouldResolveFrom(text: string): RoomSpec {
    return <RoomSpec>super.shouldResolveFrom(text);
  }

  public shouldNavigateTo(command: string, newRoomKey: string): RoomSpec {
    this.addCheck( () => {
      this.game.input(command);
      const actualKey = this.game.currentRoom.key;
      if (actualKey !== newRoomKey) {
        return `Expected '${command}' to result in a current room of ${newRoomKey} but current room is ${actualKey}.`;
      }
      return null;
    });

    return this;
  }

  public shouldFailNavigationTo(command: string, ...expectedResponses: string[]): RoomSpec {
    this.addCheck( () => {
      this.game.input(command);
      const actualKey = this.game.currentRoom.key;
      if (actualKey !== this.key) {
        return `Expected navigation to ${command} to result in remaining in ${this.key} but current room is ${actualKey}.`;
      }
      return this.checkForExpectedReply(...expectedResponses);
    });

    return this;
  }

}
