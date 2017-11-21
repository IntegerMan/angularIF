import { CommandContext } from '../command-context';
import { WorldEntity } from './world-entity';
import {CommandResult} from '../command-result';

export class PortableEntity extends WorldEntity {

  isWearable: boolean;
  isWorn: boolean;

  /**
   * Some items don't allow a drop. Let them speak their mind.
   * @param {CommandContext} context The command context
   * @returns {boolean} Whether or not the drop should occur. False prevents the drop.
   */
  allowDrop(context: CommandContext): boolean {
    return true;
  }

  allowPickup(context: CommandContext): boolean {
    return this.isPortable;
  }

  /**
   * This is a convenience method to allow objects to do something when they're dropped.
   * @param {CommandContext} context
   */
  onDropped(context: CommandContext): void {
    context.outputService.displayStory(`You drop ${this.that}.`);

    this.sendEvent(context, 'drop', this);

  }

  /**
   * This is a convenience method to allow objects to do something when they're picked up.
   * @param {CommandContext} context
   */
  onPickup(context: CommandContext, alreadyResponded: boolean): void {
    if (!alreadyResponded) {
      context.outputService.displayStory(`You pick up ${this.article} ${this.name}.`);
    }
  }


}
