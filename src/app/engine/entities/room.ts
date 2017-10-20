import {CommandToken} from '../tokenizer/command-token';
import {WorldEntity} from './world-entity';
import {CommandContext} from '../command-context';
import {ArrayHelper} from '../../utility/array-helper';
import {EntityWeight} from './entity-weight.enum';
import {EntitySize} from './entity-size.enum';
import {LightLevel} from './light-level.enum';

export class Room extends WorldEntity {

  lighting: LightLevel;

  contents: WorldEntity[];

  constructor(name: string) {
    super(name);

    this.weight = EntityWeight.building;
    this.size = EntitySize.building;
    this.lighting = LightLevel.wellLit;

  }

  addObject(object: WorldEntity): void {
    object.currentRoom = this;
    this.contents.push(object);
  }

  removeObject(object: WorldEntity): boolean {
    return ArrayHelper.removeIfPresent(this.contents, object);
  }

  findObjectsForToken(token: CommandToken, context: CommandContext): WorldEntity[] {

    // Evaluate the room's contents, including actors in it, and any nested item that is visible
    const results: WorldEntity[] = this.addItemsFromContainer(this, token, context);

    // Evaluate the room in case you're trying to find the room or the floor or whatever
    if (this.isDescribedByToken(token, context)) {
      results.push(this);
    }

    return results;
  }

  private addItemsFromContainer(container: WorldEntity, token: CommandToken, context: CommandContext): WorldEntity[] {

    const results: WorldEntity[] = [];

    for (const entity of container.getContainedEntities(context, false)) {

      if (entity.isDescribedByToken(token, context)) {
        results.push(entity);
      }

      const fromContainer = this.addItemsFromContainer(entity, token, context);
      for (const e of fromContainer) {
        results.push(e);
      }
    }

    return results;
  }

  getContainedEntities(context: CommandContext, includeHidden: boolean): WorldEntity[] {

    const items: WorldEntity[] = [];

    for (const item of this.contents) {
      // TODO: May want to check to see if an item is hidden
      items.push(item);
    }

    return items;
  }

  hasLight(context: CommandContext): boolean {
    // By default, we'll just examine the lighting enum
    return this.lighting > LightLevel.dim;
  }

  containsEntity(entity: WorldEntity, isRecursive: boolean): boolean {

    for (const item of this.contents) {
      if (item === entity) {
        return true;
      }

      if (isRecursive) {
        const childContainer: ICanContainEntities = ((item as any) as ICanContainEntities);
        if (childContainer && childContainer.containsEntity && childContainer.containsEntity(entity, isRecursive)) {
          return true;
        }
      }
    }

    return false;
  }
}
