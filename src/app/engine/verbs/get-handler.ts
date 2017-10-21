import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {WorldEntity} from '../entities/world-entity';
import {IGettable} from '../entities/i-gettable';
import {VerbType} from './verb-type.enum';

export class GetHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): boolean {

    const entities: WorldEntity[] = command.objects.filter(o => o.entity).map(o => o.entity);

    if (!entities || entities.length <= 0) {
      context.outputService.displayParserError('I\'m not sure what you want to pick up.');
      return false;
    }

    for (const entity of entities) {

      if (context.player.contents.indexOf(entity) >= 0) {
        context.outputService.displayFailedAction(`You already have ${entity.article} ${entity.name}!`);
      } else {
        this.attemptPickup(entity, context);
      }
    }

    // Even if we didn't succeed, we're going to treat it as an action since it was a serious attempt.
    return true;

  }

  private attemptPickup(entity: WorldEntity, context: CommandContext): boolean {

    const item: IGettable = ((entity as any) as IGettable);
    if (item && item.allowPickup !== undefined) {

      const result = item.allowPickup(context);
      if (result) {
        context.player.addToInventory(entity, context);
      }

      return result;
    }

    context.outputService.displayStory(`You can't pick up ${entity.article} ${entity.name}.`);
    return false;

  }

}
