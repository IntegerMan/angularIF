import {Room} from '../../engine/entities/room';
import {CommandContext} from '../../engine/command-context';
import {WorldEntity} from '../../engine/entities/world-entity';
import {Command} from '../../engine/parser/command';
import {VerbType} from '../../engine/verbs/verb-type.enum';
import {BarMessage} from './bar-message';

export class Bar extends Room {

  cloak: WorldEntity;

  message: BarMessage;

  allowCommand(command: Command, context: CommandContext): boolean {

    const wasAllowed: boolean = super.allowCommand(command, context);
    const hasLight: boolean = this.hasLight(context);
    const isLook: boolean = command.verbHandler && command.verbHandler.verbType !== VerbType.look;

    if (wasAllowed) {
      if (isLook && command.objects.filter(o => o.entity && o.entity === this.message).length > 0) {

        // We'll pretend like we examined the object
        context.outputService.displayStory(this.message.getExamineDescription(context, true));

        // End the game either in success or loss here
        const prior: number = context.state.getState(this.message.name, 0);
        context.ifService.endGame(prior < 2);

        // We'll say it wasn't allowed because we handled it
        return false;
      }

    } else {
      if (!hasLight && isLook) {

        // TODO: Having a dedicated increment state command would be nice here
        const prior: number = context.state.getState(this.message.name, 0);
        if (prior < 2) {
          context.state.setState(this.message.name, prior + 1);
        }
      }
    }

    return wasAllowed;
  }

  hasLight(context: CommandContext): boolean {
    // If the room is dark OR the cloak of darkness is present in the room, the room will be dark.
    return super.hasLight(context) && !context.currentRoom.containsEntity(this.cloak, true);
  }
}
