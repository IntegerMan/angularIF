import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';
import {CommandToken} from '../tokenizer/command-token';
import {WorldEntity} from '../world-entity';
import {StringHelper} from '../../utility/string-helper';

export class LookHandler extends VerbHandler {


  private static listPlayerInventory(context: CommandContext): boolean {

    if (!context.player.inventory || context.player.inventory.length <= 0) {

      context.outputService.displayHelpText('You aren\'t carrying anything right now.');

    } else {

      const itemNames: string[] = context.player.inventory.map(i => i.name);

      // TODO: Alphabetize these

      context.outputService.displayList(`You are currently carrying:`, itemNames);
    }

    // It shouldn't cost you a turn to list the things you already have
    return false;
  }

  private static listVerbs(context: CommandContext): boolean {

    const handlers: string[] = context.story.verbHandlers.map(vh => vh.name);

    // TODO: Alphabetize these

    context.outputService.displayList(`The verbs I know how to respond to are:`, handlers);

    // We're going to return false to this since asking for a list of verbs that we can execute shouldn't count as a move
    return false;
  }

  handleCommand(command: Command, context: CommandContext): boolean {

    // If it's just a plain old look without a target, describe the room
    if (command.objects.length <= 0) {

      context.ifService.describeRoom(context.player, context.currentRoom);

      return true;
    }

    const token: CommandToken = command.objects[0];

    // Handle special cases
    if (token.name === 'inventory') {
      return LookHandler.listPlayerInventory(context);
    } else if (token.name === 'verbs') {
      return LookHandler.listVerbs(context);
    }

    const entities: WorldEntity[] = context.currentRoom.findObjectsForToken(token, context);

    // No matches yields an "it's not here" message
    if (!entities || entities.length <= 0) {
      context.logger.log(`No local found for '${token.name}'`);
      context.outputService.displayParserError(`You don't see a ${token.name} here.`);
      return false;
    }

    // If we have more than one best match, show a disambiguation message
    if (entities.length > 1) {

      context.logger.log(`Possible matches for '${token.name}': ${StringHelper.toOxfordCommaList(entities.map(e => e.name))}`);

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
