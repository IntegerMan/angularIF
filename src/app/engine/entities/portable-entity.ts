import { CommandContext } from '../command-context';
import { WorldEntity } from './world-entity';

export class PortableEntity extends WorldEntity {

  isWearable: boolean;
  isWorn: boolean;

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

  allowPickup(context: CommandContext): boolean {
    return true;
  }

  /**
   * This is a convenience method to allow objects to do something when they're dropped.
   * @param {CommandContext} context
   */
  onDropped(context: CommandContext): void {
    context.outputService.displayStory(`You drop ${this.that}.`);
  }

  /**
   * This is a convenience method to allow objects to do something when they're picked up.
   * @param {CommandContext} context
   */
  onPickup(context: CommandContext): void {
    context.outputService.displayStory(`You pick up ${this.article} ${this.name}.`);
  }


}
