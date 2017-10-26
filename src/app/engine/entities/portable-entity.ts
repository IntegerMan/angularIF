import {Scenery} from './scenery';
import {CommandContext} from '../command-context';

export class PortableEntity extends Scenery {

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
