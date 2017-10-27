import {Scenery} from '../../engine/entities/scenery';
import {CommandContext} from '../../engine/command-context';
import {EntitySize} from '../../engine/entities/entity-size.enum';
import {EntityWeight} from '../../engine/entities/entity-weight.enum';
import {WorldEntity} from '../../engine/entities/world-entity';

export class Hook extends Scenery {

  hungObject: WorldEntity = null;

  constructor(name: string) {
    super(name, 'hook');

    this.size = EntitySize.cup;
    this.weight = EntityWeight.watch;

  }

  getExamineDescription(context: CommandContext, isScrutinize: boolean): string {
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


  allowItemHanged(context: CommandContext, itemToHang: WorldEntity): boolean {

    if (this.hungObject) {
      const text = `There's already ${this.hungObject.article} ${this.hungObject.name} hanging on ${this.article} ${this.name}.`;
      context.outputService.displayStory(text);
    } else {
      const text = `You hang ${itemToHang.article} ${itemToHang.name} on ${this.article} ${this.name}.`;
      context.outputService.displayStory(text);
      return true;
    }
  }

  onItemHanged(context: CommandContext, itemToHang: WorldEntity): void {
    super.onItemHanged(context, itemToHang);

    context.logger.debug('Hook has an item.');
    this.hungObject = itemToHang;
  }
}
