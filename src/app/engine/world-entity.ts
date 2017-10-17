import {CommandContext} from './command-context';
import {Room} from './room';

export abstract class WorldEntity {

  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get currentRoom(): Room {
    return this._currentRoom;
  }

  set currentRoom(value: Room) {
    this._currentRoom = value;
  }

  private _currentRoom: Room;

  get name(): string {
    return this._name;
  }


  private _description: string = null;  // To be implemented by concrete classes. Fallbacks will be handled by verb handlers

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  getExamineDescription(context: CommandContext): string {
    return this.description;
  }

}
