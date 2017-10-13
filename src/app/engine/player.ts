import {Room} from './room';

export class Player {

  get name(): string {
    return this._name;
  }

  get currentRoom(): Room {
    return this._currentRoom;
  }

  set currentRoom(value: Room) {
    this._currentRoom = value;
  }

  private _name: string;

  private _currentRoom: Room;

  constructor(name: string) {
    this._name = name;
  }

}
