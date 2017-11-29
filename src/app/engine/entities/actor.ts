import {WorldEntity} from './world-entity';
import {LoggingService} from '../../utility/logging.service';
import {ArrayHelper} from '../../utility/array-helper';
import {CommandContext} from '../command-context';
import {isNullOrUndefined} from 'util';

export class Actor extends WorldEntity {

  isPlayer: boolean;

  constructor(name: string = 'yourself', key: string = 'you') {
    super(name, key);

    this.isAlive = true;

    // Add some common synonyms for helping the player refer to their character
    // TODO: Seems like a bad move
    this.addNounAliases(['me', 'self', 'you', 'myself', 'character', 'avatar', 'player', 'i']);

  }

  get that(): string {
    return `${this.getArticle('')} ${this.name}`;
  }

  allowPickup(context: CommandContext): boolean {

    if (this.isPlayer) {
      context.output.addStory('You try your best best lines, but you are not impressed.');
    } else {
      context.output.addStory(`You try your best best lines, but ${this.that} is not impressed.`);
    }

    return false;
  }

  addToInventory(item: WorldEntity): boolean {

    LoggingService.instance.log(`Adding ${item.name} to ${this.that}'s inventory`);

    item.currentRoom = this.currentRoom;
    item.parent = this;
    this.contents.push(item);

    return true;
  }

  removeFromInventory(item: WorldEntity): boolean {

    // Display a warning if you're trying to do something stupid
    if (this.contents.indexOf(item) < 0) {
      return false;
    }

    // Okay, let's remove it!
    return ArrayHelper.removeIfPresent(this.contents, item);

  }

  has(entity: WorldEntity): boolean {

    if (this.contents.indexOf(entity) >= 0) {
      return true;
    } else {
      return !isNullOrUndefined(this.findEntityByKey(entity.key));
    }

  }
}
