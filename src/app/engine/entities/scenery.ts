import {WorldEntity} from './world-entity';
import {CommandContext} from '../command-context';

export class Scenery extends WorldEntity {

  shouldDescribeWithRoom(context: CommandContext): boolean {
    return true;
  }

  /**
   * Some items don't allow a drop. Let them speak their mind.
   * @param {CommandContext} context The command context
   * @returns {boolean} Whether or not the drop should occur. False prevents the drop.
   */
  allowDrop(context: CommandContext): boolean {
    return true;
  }

}
