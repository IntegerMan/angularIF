import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {CommandToken} from '../parser/command-token';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';
import {TokenClassification} from '../parser/token-classification.enum';
import {RoomLink} from '../room-link';

export class LookHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.look;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {
    return this.handleLookOrExamine(command, context, false);
  }

  protected handleLookOrExamine(command: Command, context: CommandContext, isScrutinize: boolean): CommandResult {

    // If it's just a plain old look without a target, describe the room
    if (command.objects.length <= 0) {

      context.ifService.describeRoom(context.currentRoom, context, isScrutinize);

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
    const entity = token.entity;
    if (!entity) {
      // The context lookup took care of output to the user, so we just need to abort
      return CommandResult.BuildActionFailedResult();
    }

    // Grab the description from the entity
    let description: string = entity.getExamineDescription(context, isScrutinize);
    if (!description) {
      description = `You stare at the ${token.name} for awhile, but fail to notice anything you hadn't noticed before.`;
    }

    context.outputService.displayStory(description);
    return CommandResult.BuildActionSuccessResult();

  }

  private static listPlayerInventory(context: CommandContext): CommandResult {

    if (!context.player.contents || context.player.contents.length <= 0) {

      context.outputService.displaySystem('You aren\'t carrying anything right now.');

    } else {

      const itemNames: string[] = context.player.contents.map(i => i.name).sort();

      context.outputService.displayList(`You are currently carrying:`, itemNames);
    }

    return CommandResult.BuildFreeActionResult();
  }

  private static listVerbs(context: CommandContext): CommandResult {

    const handlers: string[] = context.story.verbHandlers.filter(v => !v.isHidden).map(vh => vh.name).sort();

    context.outputService.displayList(`The verbs I know how to respond to are:`, handlers);

    // We're going to return false to this since asking for a list of verbs that we can execute shouldn't count as a move
    return CommandResult.BuildFreeActionResult();
  }

  private static handleLookInDirection(context: CommandContext, dir: CommandToken): CommandResult {

    let text: string;
    const link: RoomLink = context.navService.getLink(context.currentRoom, dir.name);

    if (link) {
      if (link.lookMessage) {
        text = link.lookMessage;
      } else {
        text = `You look to the ${dir.name} but are unable to tell much from here. You'll have to go there yourself.`;
      }
    } else {
      text = `You can't go any farther to the ${dir.name}.`;
    }

    context.outputService.displayStory(text);


    return CommandResult.BuildActionFailedResult();
  }

}
