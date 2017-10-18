import {Scenery} from '../../engine/entities/scenery';
import {CommandContext} from '../../engine/command-context';

export class Hook extends Scenery {

  hungObject: Scenery = null;

  getExamineDescription(): string {
    if (this.hungObject) {
      return `It's just a ${this.name} with a ${this.hungObject.name} hanging on it.`;
    } else {
      return `It's just a ${this.name} screwed to the wall.`;
    }
  }

  shouldDescribeWithRoom(context: CommandContext): boolean {
    // TODO: May want to subclass scenery here
    return false;
  }
}
