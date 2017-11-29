import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {WorldEntity} from '../entities/world-entity';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';
import {PortableEntity} from '../entities/portable-entity';
import {EntityBase} from '../entities/entity-base';
import {ArrayHelper} from '../../utility/array-helper';

export class GetHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    // Get a DISTINCT list of entities we wish to pick up
    const entities: EntityBase[] = command.getDistinctEntitiesFromObjects();

    if (entities.length <= 0) {
      context.output.addParserError('I\'m not sure what you want to pick up.');
      return CommandResult.BuildParseFailedResult();
    }

    // Try to pick up everything we requested
    let anySuccess: boolean = false;
    for (const entity of entities) {

      if (ArrayHelper.contains(context.player.contents, entity)) {
        context.output.addStory(`You already have ${entity.that}!`);
      } else {
        if (this.attemptPickup(entity, context).succeeded) {
          anySuccess = true;
        }
      }
    }

    // Even if we didn't succeed, we're going to treat it as an action since it was a serious attempt.
    if (anySuccess) {
      return CommandResult.BuildActionSuccessResult();
    } else {
      return CommandResult.BuildActionFailedResult();
    }

  }

  private attemptPickup(entity: EntityBase, context: CommandContext): CommandResult {

    let respondedTo: boolean = false;

    if (entity && entity instanceof PortableEntity) {

      const item: PortableEntity = entity;

      respondedTo = item.invokeVerbResponse(context, 'get');

      const result = item.allowPickup(context);
      if (result) {

        // Remove the entity from its current parent
        if (entity.parent) {
          entity.parent.removeObject(entity);
        }

        context.player.addToInventory(entity);
        item.onPickup(context, respondedTo);

        return CommandResult.BuildActionSuccessResult();

      }

    }

    if (!respondedTo) {
      if (!(entity instanceof WorldEntity)) {
        context.output.addStory(`You can't be serious.`);
      } else if ((<WorldEntity>entity).getAttribute('isMassive', false) === true) {
        context.output.addStory(`Surely you can't be serious. That's well beyond your ability to even budge.`);
      } else {
        context.output.addStory(`You can't pick up ${entity.that}.`);
      }
    }

    return CommandResult.BuildActionFailedResult();

  }

}
