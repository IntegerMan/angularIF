import {WorldEntity} from './world-entity';
import {Scenery} from './scenery';
import {LoggingService} from '../logging.service';
import {ArrayHelper} from '../utility/array-helper';
import {CommandContext} from './command-context';
import {ICanContainEntities} from './i-can-contain-entities';

export class Player extends WorldEntity implements ICanContainEntities {

  inventory: Scenery[];

  constructor(name: string) {
    super(name);

    this.inventory = [];

    // TODO: Give a default self-description here
  }

  addToInventory(item: Scenery, context: CommandContext = null): boolean {

    LoggingService.instance.log(`Adding ${item.name} to ${this.name}'s inventory`);

    item.currentRoom = null;
    this.inventory.push(item);

    return true;
  }

  removeFromInventory(item: Scenery, context: CommandContext = null): boolean {

    // Display a warning if you're trying to do something stupid
    if (this.inventory.indexOf(item) < 0) {

      if (context) {
        context.outputService.displayParserError(`You aren't carrying ${item.article} ${item.name}.`);
      }

      return false;
    }

    // TODO: Some items may want checks or separate actions if the player is going to remove them

    // Okay, let's remove it!
    if (ArrayHelper.removeIfPresent(this.inventory, item)) {

      LoggingService.instance.log(`Dropping ${item.name} from ${this.name}'s inventory to the floor of ${this.currentRoom.name}.`);

      if (context) {
        context.outputService.displayStory(`You drop ${item.article} ${item.name}.`);
      }

      return true;
    }

    return false;

  }

  getContainedEntities(context: CommandContext, includeHidden: boolean): WorldEntity[] {

    const items: WorldEntity[] = [];

    // By default, inventory items are only visible to the person carrying them
    if (includeHidden || context.player === this) {
      for (const item of this.inventory) {
        items.push(item);
      }
    }

    return items;
  }


}
