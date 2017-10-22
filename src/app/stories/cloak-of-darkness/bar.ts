import {Room} from '../../engine/entities/room';
import {CommandContext} from '../../engine/command-context';
import {WorldEntity} from '../../engine/entities/world-entity';
import {Command} from '../../engine/parser/command';
import {VerbType} from '../../engine/verbs/verb-type.enum';

export class Bar extends Room {

  cloak: WorldEntity;

  message: WorldEntity;

  allowCommand(command: Command, context: CommandContext): boolean {
    const wasAllowed: boolean = super.allowCommand(command, context);

    if (!wasAllowed && !this.hasLight(context) && command.verbHandler && command.verbHandler.verbType !== VerbType.look) {

      // TODO: Having a dedicated increment state command would be nice here
      const prior: number = context.state.getState(this.message.name, 0);
      if (prior < 2) {
        context.state.setState(this.message.name, prior + 1);
      }
    }

    return wasAllowed;
  }

  hasLight(context: CommandContext): boolean {
    // If the room is dark OR the cloak of darkness is present in the room, the room will be dark.
    return super.hasLight(context) && !context.currentRoom.containsEntity(this.cloak, true);
  }
}
