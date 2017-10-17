import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';
import {CommandToken} from '../tokenizer/command-token';
import {WorldEntity} from '../world-entity';

export class LookHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    // If it's just a plain old look without a target, describe the room
    if (command.objects.length <= 0) {

      context.ifService.describeRoom(context.player, context.currentRoom);

      return true;
    }

    const token: CommandToken = command.objects[0];

    const entities: WorldEntity[] = context.currentRoom.findObjectsForToken(token, context);
    if (!entities || entities.length <= 0) {
      context.logger.log(`No local found for '${token.name}'`);
      context.outputService.displayParserError(`You don't see a ${token.name} here.`);
      return false;
    }

    if (entities.length > 1) {

      context.logger.log(`Possible matches for '${token.name}': ${entities.map(e => e.name).join(', ')}`);

      // TODO: Better disambiguation is needed here
      context.outputService.displayParserError(`There is more than one object here matching that description. Can you be more specific?`);
      return false;
    }

    const entity: WorldEntity = entities[0];
    context.logger.log(`Match found for '${token.name}': ${entity.name}`);

    // Grab the description from the entity
    let description: string = entity.getExamineDescription(context);
    if (!description) {
      description = `You stare at the ${token.name} for awhile, but fail to notice anything more noteworthy.`;
    }

    context.outputService.displayStory(description);
    return true;

  }

}
