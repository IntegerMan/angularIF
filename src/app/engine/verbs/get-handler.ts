import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';
import {WorldEntity} from '../entities/world-entity';

export class GetHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    const entities: WorldEntity[] = command.objects.filter(o => o.entity).map(o => o.entity);

    if (!entities || entities.length <= 0) {
      context.outputService.displayParserError('I\'m not sure what you want to pick up.');
      return false;
    }

    for (const entity of entities) {

      if (context.player.inventory.indexOf(entity) >= 0) {
        context.outputService.displayStory(`You already have ${entity.article} ${entity.name}!`);
      } else {
        this.attemptPickup(entity, context);
      }
    }

    // Even if we didn't succeed, we're going to treat it as an action since it was a serious attempt.
    return true;

  }

  private attemptPickup(entity: WorldEntity, context: CommandContext): boolean {


    context.outputService.displayStory(`You can't pick up ${entity.article} ${entity.name}.`);

    return false;

  }

}
