import {Scenery} from './scenery';
import {CommandToken} from './tokenizer/command-token';
import {WorldEntity} from './world-entity';
import {CommandContext} from './command-context';

export class Room extends WorldEntity {

  contents: Scenery[];

  constructor(name: string) {
    super(name);

    this.contents = [];
  }

  private _description: string = null;

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  getExamineDescription(context: CommandContext): string {
    return this.description;
  }

  addObject(object: Scenery) {
    this.contents.push(object);
  }

  findObjectsForToken(token: CommandToken, context: CommandContext): WorldEntity[] {

    const results: WorldEntity[] = [];

    // Evaluate scenery
    for (const s of this.contents) {

      if (s.isDescribedByToken(token, context)) {
        results.push(s);
      }

    }

    // TODO: Evaluate actors here, including the player
    // TODO: Evaluate actor's inventory (at least the visible portions thereof)

    // TODO: Evaluate the room in case you're trying to find the room or the floor or whatever

    return results;
  }

}
