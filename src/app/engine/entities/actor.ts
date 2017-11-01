import {WorldEntity} from './world-entity';
import {LoggingService} from '../../utility/logging.service';
import {ArrayHelper} from '../../utility/array-helper';
import {CommandContext} from '../command-context';
import {EntitySize} from './entity-size.enum';
import {EntityWeight} from './entity-weight.enum';

export class Actor extends WorldEntity {

  isPlayer: boolean;

  constructor(name: string = 'yourself', key: string = 'you') {
    super(name, key);

    this.article = '';
    this.isAlive = true;

    // Add some common synonyms for helping the player refer to their character
    this.addNounAliases(['me', 'self', 'you', 'myself', 'character', 'avatar', 'player']);

    this.weight = EntityWeight.person;
    this.size = EntitySize.person;

  }

  allowPickup(context: CommandContext): boolean {

    context.outputService.displayStory('You try your best best lines, but you are not impressed.');

    return false;
  }

  addToInventory(item: WorldEntity): boolean {

    LoggingService.instance.log(`Adding ${item.name} to ${this.name}'s inventory`);

    item.currentRoom = null;
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

}
