import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {CommandToken} from '../parser/command-token';
import {PortableEntity} from '../entities/portable-entity';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';

export class DropHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    // If it's just a plain old look without a target, describe the room
    if (command.objects.length <= 0) {

      context.ifService.describeRoom(context.currentRoom, context);

      return CommandResult.BuildActionSuccessResult();
    }

    const token: CommandToken = command.objects[0];

    // Handle special cases
    if (token.name === 'inventory' || token.name === 'all' || token.name === 'everything') {
      return this.dropEverything(context);
    }

    // Let the context object take care of disambiguation and lookup
    const entity = token.entity;
    if (!entity) {
      // The context lookup took care of output to the user, so we just need to abort
      return CommandResult.BuildParseFailedResult();
    }

    // Protect against invalid class since we need a Scenery instance up ahead
    if (!(entity instanceof PortableEntity)) {
      context.outputService.displayStory(`You can't drop that!`);
      return CommandResult.BuildActionFailedResult();
    }

    return this.dropItem(entity, context);

  }

  dropEverything(context: CommandContext): CommandResult {

    // Don't do any dropping if the player isn't carrying anything
    if (context.player.contents.length <= 0) {
      context.outputService.displayStory('You aren\'t currently carrying anything.');
      return CommandResult.BuildActionFailedResult();
    }

    let result: boolean = false;

    for (const item of context.player.contents) {

      if (item instanceof PortableEntity &&
          this.dropItem(<PortableEntity>item, context)) {

        result = true;

      }

    }

    if (result) {
      return CommandResult.BuildActionSuccessResult();
    } else {
      return CommandResult.BuildActionFailedResult();
    }
  }

  dropItem(item: PortableEntity, context: CommandContext): CommandResult {

    if (!item.allowDrop(context)) {
      return CommandResult.BuildActionFailedResult();
    }

    if (context.player.removeFromInventory(item)) {

      context.logger.debug(`Dropping ${item.that} from ${this.name}'s inventory to the floor of ${context.currentRoom.name}.`);

      context.currentRoom.addObject(item);

      item.onDropped(context);

      return CommandResult.BuildActionSuccessResult();
    }

    return CommandResult.BuildActionFailedResult();
  }

}
