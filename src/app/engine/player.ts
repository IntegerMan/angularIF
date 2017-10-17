import {Room} from './room';
import {WorldEntity} from './world-entity';
import {Scenery} from './scenery';
import {LoggingService} from '../logging.service';

export class Player extends WorldEntity {

  inventory: Scenery[];

  constructor(name: string) {
    super(name);

    this.inventory = [];

    // TODO: Give a default self-description here
  }

  addToInventory(item: Scenery) {

    LoggingService.instance.log(`Adding ${item.name} to ${this.name}'s inventory`);

    item.currentRoom = null;
    this.inventory.push(item);
  }
}
