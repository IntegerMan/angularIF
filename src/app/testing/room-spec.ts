import {EntitySpec} from './entity-spec';
import {Room} from '../engine/entities/room';
import {StoryTestingServiceBase} from './story-testing-service-base';

export class RoomSpec extends EntitySpec {

  constructor(key: string, room: Room, testService: StoryTestingServiceBase) {
    super(key, room, testService);
  }

  public shouldResolveFrom(text: string): RoomSpec {
    return <RoomSpec>super.shouldResolveFrom(text);
  }

  public shouldNavigateTo(direction: string, newRoomKey: string): RoomSpec {
    this.addCheck( () => {
      this.game.input(direction);
      const actualKey = this.game.currentRoom.key;
      if (actualKey !== newRoomKey) {
        return `Expected navigation to ${direction} to result in a current room of ${newRoomKey} but current room is ${actualKey}.`;
      }
      return null;
    });

    return this;
  }

  public shouldFailNavigationTo(direction: string, ...expectedResponses: string[]): RoomSpec {
    this.addCheck( () => {
      this.game.input(direction);
      const actualKey = this.game.currentRoom.key;
      if (actualKey !== this.key) {
        return `Expected navigation to ${direction} to result in remaining in ${this.key} but current room is ${actualKey}.`;
      }
      return this.checkForExpectedReply(...expectedResponses);
    });

    return this;
  }

}
