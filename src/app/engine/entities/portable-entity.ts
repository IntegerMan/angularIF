import {Scenery} from './scenery';
import {CommandContext} from '../command-context';

export class PortableEntity extends Scenery {

  allowPickup(context: CommandContext): boolean {

    context.outputService.displaySuccessAction(`You pick up ${this.article} ${this.name}.`);

    return true;
  }

  /**
   * This is a convenience method to allow objects to do something when they're dropped.
   * @param {CommandContext} context
   */
  onDropped(context: CommandContext): void {
  }

  /**
   * This is a convenience method to allow objects to do something when they're picked up.
   * @param {CommandContext} context
   */
  onPickup(context: CommandContext): void {
  }

}
