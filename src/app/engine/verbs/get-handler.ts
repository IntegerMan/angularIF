import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {WorldEntity} from '../entities/world-entity';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';
import {PortableEntity} from '../entities/portable-entity';

export class GetHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    const entities: WorldEntity[] = command.objects.filter(o => o.entity).map(o => o.entity);

    if (!entities || entities.length <= 0) {
      context.outputService.displayParserError('I\'m not sure what you want to pick up.');
      return CommandResult.BuildParseFailedResult();
    }

    // Try to pick up everything we requested
    let anySuccess: boolean = false;
    for (const entity of entities) {

      if (context.player.contents.indexOf(entity) >= 0) {
        context.outputService.displayStory(`You already have ${entity.that}!`);
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

  private attemptPickup(entity: WorldEntity, context: CommandContext): CommandResult {

    if (entity && entity instanceof PortableEntity) {

      const item: PortableEntity = entity;

      const result = item.allowPickup(context);
      if (result) {

        // Remove the entity from its current parent
        if (entity.parent) {
          entity.parent.removeObject(entity);
        }

        context.player.addToInventory(entity);
        item.onPickup(context);

        return CommandResult.BuildActionSuccessResult();

      } else {

        return CommandResult.BuildActionFailedResult();

      }

    }

    context.outputService.displayStory(`You can't pick up ${entity.that}.`);
    return CommandResult.BuildActionFailedResult();

  }

}
