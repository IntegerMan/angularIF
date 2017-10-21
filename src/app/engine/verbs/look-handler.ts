import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {CommandToken} from '../parser/command-token';
import {VerbType} from './verb-type.enum';

export class LookHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.look;
  }

  private static listPlayerInventory(context: CommandContext): boolean {

    if (!context.player.contents || context.player.contents.length <= 0) {

      context.outputService.displaySystem('You aren\'t carrying anything right now.');

    } else {

      // TODO: It might be nice to initial capitalize each one of these items
      const itemNames: string[] = context.player.contents.map(i => i.name).sort();

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
    return this.handleLookOrExamine(command, context, false);
  }

  protected handleLookOrExamine(command: Command, context: CommandContext, isScrutinize: boolean): boolean {

    // If it's just a plain old look without a target, describe the room
    if (command.objects.length <= 0) {

      context.ifService.describeRoom(context.currentRoom, context, isScrutinize);

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
    const entity = token.entity;
    if (!entity) {
      // The context lookup took care of output to the user, so we just need to abort
      return false;
    }

    // Grab the description from the entity
    let description: string = entity.getExamineDescription(context, isScrutinize);
    if (!description) {
      description = `You stare at the ${token.name} for awhile, but fail to notice anything more noteworthy.`;
    }

    context.outputService.displayStory(description);
    return true;

  }
}
