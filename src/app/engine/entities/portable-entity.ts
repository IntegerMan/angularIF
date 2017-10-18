import {Scenery} from './scenery';
import {IGettable} from './i-gettable';
import {CommandContext} from '../command-context';

export class PortableEntity extends Scenery implements IGettable {

  allowPickup(context: CommandContext): boolean {

    context.outputService.displaySuccessAction(`You pick up ${this.article} ${this.name}.`);

    return true;
  }

}
