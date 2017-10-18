import {CommandToken} from '../tokenizer/command-token';
import {WorldEntity} from './world-entity';
import {CommandContext} from '../command-context';
import {ArrayHelper} from '../../utility/array-helper';
import {ICanContainEntities} from './i-can-contain-entities';

export class Room extends WorldEntity implements ICanContainEntities {

  contents: WorldEntity[];

  constructor(name: string) {
    super(name);

    this.contents = [];
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

  private addItemsFromContainer(container: ICanContainEntities, token: CommandToken, context: CommandContext): WorldEntity[] {

    const results: WorldEntity[] = [];

    for (const entity of container.getContainedEntities(context, false)) {

      if (entity.isDescribedByToken(token, context)) {
        results.push(entity);
      }

      // Yuck. I just want to see if it supports getting the contained entities
      const childContainer: ICanContainEntities = ((entity as any) as ICanContainEntities);
      if (childContainer && childContainer.getContainedEntities !== undefined) {

        const fromContainer = this.addItemsFromContainer(childContainer, token, context);
        for (const e of fromContainer) {
          results.push(e);
        }

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

}
