import {CommandToken} from '../parser/command-token';
import {WorldEntity} from './world-entity';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {VerbType} from '../verbs/verb-type.enum';
import {RoomLink} from '../room-link';

export class Room extends WorldEntity {

  contents: WorldEntity[];
  roomLink: {};

  constructor(name: string, key: string) {
    super(name, key);

    this.roomLink = {};

    // This lets other scripts safely refer to currentRoom in a more generic way
    this.currentRoom = this;

    // Set good defaults for rooms
    this.setAttribute('isMassive', true);
    this.setAttribute('describeWithRoom', false);
  }

  findObjectsForToken(token: CommandToken, context: CommandContext): WorldEntity[] {

    // Evaluate the room's contents, including actors in it, and any nested item that is visible
    const results: WorldEntity[] = this.addItemsFromContainer(this, token, context);

    // Evaluate the room in case you're trying to find the room or the floor or whatever

    console.log(this.nouns);
    console.log(this.adjectives);
    if (this.isDescribedByToken(token, context)) {
      results.push(this);
    }

    return results;
  }

  hasLight(context: CommandContext): boolean {

    const atr = this.getAttribute('isDark', false);

    if (!atr) {
      return true;
    }

    if (atr === true || atr === false) {
      return !(atr as boolean);
    }

    return atr.toLowerCase() === 'false';
  }

  private addItemsFromContainer(container: WorldEntity, token: CommandToken, context: CommandContext): WorldEntity[] {

    const results: WorldEntity[] = [];

    for (const entity of container.getContainedEntities(context, false)) {

      if (entity.isDescribedByToken(token, context)) {
        results.push(entity);
      }

      const fromContainer = this.addItemsFromContainer(entity, token, context);
      for (const e of fromContainer) {
        results.push(e);
      }
    }

    return results;
  }

}
