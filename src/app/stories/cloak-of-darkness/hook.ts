import {Scenery} from '../../engine/entities/scenery';
import {CommandContext} from '../../engine/command-context';
import {EntitySize} from '../../engine/entities/entity-size.enum';
import {EntityWeight} from '../../engine/entities/entity-weight.enum';

export class Hook extends Scenery {


  constructor(name: string) {
    super(name);

    this.size = EntitySize.cup;
    this.weight = EntityWeight.watch;

  }

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
