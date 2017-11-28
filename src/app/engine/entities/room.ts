import {CommandToken} from '../parser/command-token';
import {WorldEntity} from './world-entity';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {VerbType} from '../verbs/verb-type.enum';
import {RoomLink} from '../room-link';
import {EntityBase} from './entity-base';

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

  findObjectsForToken(token: CommandToken, context: CommandContext): EntityBase[] {

    // Evaluate the room's contents, including actors in it, and any nested item that is visible
    const results: EntityBase[] = [];
    this.addItemsFromContainer(results, this, token, context);

    // Evaluate room links. This is important for things like "go to back yard" or whatever.
    for (const dir of Object.getOwnPropertyNames(this.roomLink)) {
      const link: RoomLink = this.roomLink[dir];
      if (link.isDescribedByToken(token, context)) {
        results.push(link);
      }

    }

    // Evaluate the room in case you're trying to find the room or the floor or whatever
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

  private addItemsFromContainer(list: EntityBase[], container: WorldEntity, token: CommandToken, context: CommandContext): void {

    for (const entity of container.getContainedEntities(context, false)) {

      if (entity.isDescribedByToken(token, context)) {
        list.push(entity);
      }

      this.addItemsFromContainer(list, entity, token, context);
    }
  }

}
