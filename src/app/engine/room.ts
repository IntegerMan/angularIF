import {Scenery} from './scenery';
import {CommandToken} from './tokenizer/command-token';
import {WorldEntity} from './world-entity';
import {CommandContext} from './command-context';
import {ArrayHelper} from '../utility/array-helper';

export class Room extends WorldEntity {

  contents: WorldEntity[];

  constructor(name: string) {
    super(name);

    this.contents = [];
  }

  addObject(object: WorldEntity): void {

    object.currentRoom = this;
    this.contents.push(object);

  }

  removeObject(object: WorldEntity): boolean {
    return ArrayHelper.removeIfPresent(this.contents, object);
  }

  findObjectsForToken(token: CommandToken, context: CommandContext): WorldEntity[] {

    const results: WorldEntity[] = [];

    // Evaluate scenery
    for (const entity of this.contents) {

      if (entity.isDescribedByToken(token, context)) {
        results.push(entity);
      }

      // TODO: Some entities contain others. This can include open containers, the player's inventory, etc. Detect this and list 'em

    }

    // TODO: Evaluate the room in case you're trying to find the room or the floor or whatever

    return results;
  }

}
