export class Room {
  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get name(): string {
    return this._name;
  }

  private _name: string;
  private _description: string = 'It\'s pretty much what you\'d expect';

  constructor(name: string) {
    this._name = name;
  }

  southTo(target: Room): Room {

    return this;
  }

  westTo(target: Room): Room {

    return this;
  }

  eastTo(target: Room): Room {

    return this;
  }

  northTo(target: Room): Room {

    return this;
  }

}
