import {CommandContext} from './command-context';

export abstract class WorldEntity {

  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  getExamineDescription(context: CommandContext): string {
    return null; // To be implemented by concrete classes. Fallbacks will be handled by verb handlers
  }

}
