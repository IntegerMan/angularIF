import {CommandToken} from '../parser/command-token';
import {WorldEntity} from './world-entity';
import {CommandContext} from '../command-context';
import {ArrayHelper} from '../../utility/array-helper';
import {EntityWeight} from './entity-weight.enum';
import {EntitySize} from './entity-size.enum';
import {LightLevel} from './light-level.enum';
import {Command} from '../parser/command';
import {VerbType} from '../verbs/verb-type.enum';

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

  hasLight(context: CommandContext): boolean {
    // By default, we'll just examine the lighting enum
    return this.lighting > LightLevel.dim;
  }

  allowCommand(command: Command, context: CommandContext): boolean {

    if (!this.hasLight(context)) {

      if (command.verbHandler) {
        switch (command.verbHandler.verbType) {

          case VerbType.system:
            // Just because it's dark doesn't mean that the user shouldn't be able to interact with the engine
            return true;

          case VerbType.social:
            // This might be tricky since some social interactions might be physical in nature - hugging, giving something, etc.
            return true;

          case VerbType.look:
            context.outputService.displayFailedAction(`It's pitch black; you can't see a thing!`);
            return false;

          case VerbType.go:
            const dir: CommandToken = command.getFirstDirection();

            if (dir && dir.entity && dir.entity instanceof Room) {

              const targetRoom: Room = dir.entity;

              // If we're walking towards a room that is lit, it's allowable.
              if (targetRoom.hasLight(context)) {
                return true;
              }
            }

            context.outputService.displayFailedAction(`Blundering around in the dark isn't a good idea!`);
            return false;

          case VerbType.manipulate:
            context.outputService.displayFailedAction(`In the dark? You could easily disturb something!`);
            return false;

        }
      }

    }

    return true;
  }

}
