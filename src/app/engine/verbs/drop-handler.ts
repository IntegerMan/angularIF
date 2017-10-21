import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {CommandToken} from '../parser/command-token';
import {Scenery} from '../entities/scenery';
import {PortableEntity} from '../entities/portable-entity';
import {VerbType} from './verb-type.enum';

export class DropHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): boolean {

    // If it's just a plain old look without a target, describe the room
    if (command.objects.length <= 0) {

      context.ifService.describeRoom(context.currentRoom, context);

      return true;
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
      return false;
    }

    // Protect against invalid class since we need a Scenery instance up ahead
    if (!(entity instanceof PortableEntity)) {
      context.outputService.displayFailedAction(`You can't drop that!`);
      return false;
    }

    return this.dropItem(entity, context);

  }

  dropEverything(context: CommandContext): boolean {

    // Don't do any dropping if the player isn't carrying anything
    if (context.player.contents.length <= 0) {
      context.outputService.displayFailedAction('You aren\'t currently carrying anything.');
      return false;
    }

    let result: boolean = false;

    for (const item of context.player.contents) {

      if (item instanceof PortableEntity &&
          this.dropItem(<PortableEntity>item, context)) {

        result = true;

      }

    }

    return result;
  }

  dropItem(item: PortableEntity, context: CommandContext): boolean {

    if (!item.allowDrop(context)) {
      return false;
    }

    if (context.player.removeFromInventory(item, context)) {
      context.currentRoom.addObject(item);

      return true;
    }

    return false;
  }

}
