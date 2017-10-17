import {Room} from './room';
import {WorldEntity} from './world-entity';

export class Player extends WorldEntity {

  get currentRoom(): Room {
    return this._currentRoom;
  }

  set currentRoom(value: Room) {
    this._currentRoom = value;
  }

  private _currentRoom: Room;

  constructor(name: string) {
    super(name);

    // TODO: Give a default self-description here
  }

}
