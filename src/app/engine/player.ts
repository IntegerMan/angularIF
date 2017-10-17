import {Room} from './room';
import {WorldEntity} from './world-entity';
import {Scenery} from './scenery';

export class Player extends WorldEntity {

  inventory: Scenery[];

  get currentRoom(): Room {
    return this._currentRoom;
  }

  set currentRoom(value: Room) {
    this._currentRoom = value;
  }

  private _currentRoom: Room;

  constructor(name: string) {
    super(name);

    this.inventory = [];

    // TODO: Give a default self-description here
  }

}
