import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';
import {CommandToken} from '../tokenizer/command-token';
import {Scenery} from '../scenery';

export class DropHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {


    // If it's just a plain old look without a target, describe the room
    if (command.objects.length <= 0) {

      context.ifService.describeRoom(context.player, context.currentRoom);

      return true;
    }

    const token: CommandToken = command.objects[0];

    // Handle special cases
    if (token.name === 'inventory' || token.name === 'all' || token.name === 'everything') {
      return this.dropEverything(context);
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

  dropEverything(context: CommandContext): boolean {

    // Don't do any dropping if the player isn't carrying anything
    if (context.player.inventory.length <= 0) {
      context.outputService.displayParserError('You aren\'t currently carrying anything.');
      return false;
    }

    let result: boolean = false;

    for (const item of context.player.inventory) {
      if (this.dropItem(item, context)) {
        result = true;
      }
    }

    return result;
  }

  dropItem(item: Scenery, context: CommandContext) {

    if (context.player.removeFromInventory(item, context)) {
      item.currentRoom = context.currentRoom;
    }

  }

}
