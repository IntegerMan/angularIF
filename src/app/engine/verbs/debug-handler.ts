import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';
import {environment} from '../../../environments/environment';

export class DebugHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.system;
  }

  get isHidden(): boolean {
    return true;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    if (!environment.showDebugAids) {
      context.outputService.displaySystem('Debugging aids are not available.');
      return CommandResult.BuildFreeActionResult();
    }

    if (command.tokens.filter(t => !t.isInferred).length <= 1) {

      // Just went with 'debug' interpret it at the room level
      context.outputService.displayEntityDebugInfo(context.currentRoom.name, context.currentRoom);

    } else if (command.isTargetingAll) {

      // List everything inside of the room, including the player.
      for (const obj of context.currentRoom.contents) {
        context.outputService.displayEntityDebugInfo(obj.that, obj);
      }

    } else {

      // We have a specific debug string. List the token and entity mapping for each token.
      for (const token of command.tokens) {

        if (token.name === 'debug' || token.isInferred) {
          continue;
        }

        context.outputService.displayTokenDebugInfo(token.name, token);

        if (token.entity) {
          context.outputService.displayEntityDebugInfo(token.entity.that, token.entity);
        }
      }

    }

    return CommandResult.BuildFreeActionResult();
  }
}
