import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';
import {environment} from '../../../environments/environment';
import {RenderType} from '../../text-rendering/render-type.enum';

export class DebugHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.system;
  }

  get isHidden(): boolean {
    return true;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    if (!environment.showDebugAids) {
      context.output.addSystem('Debugging aids are not available in a release build.');
      return CommandResult.BuildFreeActionResult();
    }

    if (command.tokens.filter(t => !t.isInferred).length <= 1) {

      // Just went with 'debug' interpret it at the room level
      context.output.addLine(context.currentRoom.name, RenderType.entityDebug, context.currentRoom);

    } else if (command.isTargetingAll) {

      // List everything inside of the room, including the player.
      for (const obj of context.currentRoom.contents) {
        context.output.addLine(obj.that, RenderType.entityDebug, obj);
      }

    } else {

      // We have a specific debug string. List the token and entity mapping for each token.
      for (const token of command.tokens) {

        if (token.name === 'debug' || token.isInferred) {
          continue;
        }

        context.output.addLine(token.name, RenderType.tokenDebug, token);

        if (token.entity) {
          context.output.addLine(token.entity.that, RenderType.entityDebug, token.entity);
        }
      }

    }

    return CommandResult.BuildFreeActionResult();
  }
}
