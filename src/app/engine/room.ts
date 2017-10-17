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

  addObject(object: Scenery): void {

    object.currentRoom = this;
    this.contents.push(object);

  }

  removeObject(object: Scenery): void {
    const index: number = this.contents.indexOf(object);
    if (index >= 0) {
      // TODO: This might be nice to extract out to an array utility of some sort
      this.contents.splice(index, 1);
    }
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
