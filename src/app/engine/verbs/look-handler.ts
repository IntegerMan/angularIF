import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';
import {CommandToken} from '../tokenizer/command-token';

export class LookHandler extends VerbHandler {


  private static listPlayerInventory(context: CommandContext): boolean {

    if (!context.player.inventory || context.player.inventory.length <= 0) {

      context.outputService.displaySystem('You aren\'t carrying anything right now.');

    } else {

      // TODO: It might be nice to initial capitalize each one of these items
      const itemNames: string[] = context.player.inventory.map(i => i.name).sort();

      context.outputService.displayList(`You are currently carrying:`, itemNames);
    }

    // It shouldn't cost you a turn to list the things you already have
    return false;
  }

  private static listVerbs(context: CommandContext): boolean {

    const handlers: string[] = context.story.verbHandlers.map(vh => vh.name).sort();

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

    // Let the context object take care of disambiguation and lookup
    const entity = context.getSingleObjectForToken(token);
    if (!entity) {
      // The context lookup took care of output to the user, so we just need to abort
      return false;
    }

    // Grab the description from the entity
    let description: string = entity.getExamineDescription(context);
    if (!description) {
      description = `You stare at the ${token.name} for awhile, but fail to notice anything more noteworthy.`;
    }

    context.outputService.displayStory(description);
    return true;

  }

}
