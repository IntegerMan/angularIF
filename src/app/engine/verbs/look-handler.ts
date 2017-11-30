import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {CommandToken} from '../parser/command-token';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';
import {TokenClassification} from '../parser/token-classification.enum';
import {RoomLink} from '../room-link';
import {StringHelper} from '../../utility/string-helper';
import {WorldEntity} from '../entities/world-entity';

export class LookHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.look;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    // If it's just a plain old look without a target, describe the room
    if (command.objects.length <= 0) {

      context.engine.describeRoom(context.currentRoom, context);

      return CommandResult.BuildActionSuccessResult();
    }

    const token: CommandToken = command.objects[0];

    // Handle special cases
    if (token.name === 'inventory') {
      return LookHandler.listPlayerInventory(context);
    } else if (token.name === 'verbs') {
      return LookHandler.listVerbs(context);
    } else if (token.classification === TokenClassification.Direction) {
      return LookHandler.handleLookInDirection(context, token);
    }

    // Let the context object take care of disambiguation and lookup
    const entity: WorldEntity = token.entity as WorldEntity;
    if (!entity || !(entity instanceof WorldEntity)) {
      // The context lookup took care of output to the user, so we just need to abort
      return CommandResult.BuildActionFailedResult();
    }

    // Invoke the appropriate response
    // TODO: The isScrutinize bits can likely be farmed out to the individual verb handler
    if (entity.invokeVerbResponse(context, 'look', entity)) {
      return CommandResult.BuildActionSuccessResult();
    }

    if (entity.isMissing) {
      context.output.addStory(`You don't see ${entity.that} here.`);
    } else {
      context.output.addStory(`${StringHelper.capitalize(entity.that)} is wholly unremarkable.`);
    }

    return CommandResult.BuildActionSuccessResult();

  }

  private static listPlayerInventory(context: CommandContext): CommandResult {

    if (!context.player.contents || context.player.contents.length <= 0) {

      context.output.addSystem('You aren\'t carrying anything right now.');

    } else {

      const itemNames: string[] = context.player.contents.map(i => i.name).sort();

      context.output.addList(`You are currently carrying:`, itemNames);
    }

    return CommandResult.BuildFreeActionResult();
  }

  private static listVerbs(context: CommandContext): CommandResult {

    const handlers: string[] = context.story.verbHandlers.filter(v => !v.isHidden).map(vh => vh.name).sort();

    context.output.addList(`The verbs I know how to respond to are:`, handlers);

    // We're going to return false to this since asking for a list of verbs that we can execute shouldn't count as a move
    return CommandResult.BuildFreeActionResult();
  }

  private static handleLookInDirection(context: CommandContext, dir: CommandToken): CommandResult {

    const link: RoomLink = context.currentRoom.roomLink[dir.name];

    if (link) {
      if (link.lookResponse) {
        link.lookResponse.invoke(context, link);
      } else {
        // TODO: Doesn't sound right for up / down
        const text = `You look to the ${dir.name} but are unable to tell much from here. You'll have to go there yourself.`;
        context.output.addStory(text);
      }
    } else {
      // TODO: Doesn't sound right for up / down
      const text = `You can't go any farther to the ${dir.name}.`;
      context.output.addStory(text);
    }

    return CommandResult.BuildActionFailedResult();
  }

}
