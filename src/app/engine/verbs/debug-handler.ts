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

    if (environment.production) {
      context.outputService.displaySystem('Debugging aids are not available in production.');
      return CommandResult.BuildFreeActionResult();
    }

    if (command.isTargetingAll || command.tokens.filter(t => !t.isInferred).length <= 1) {

      context.outputService.displayEntityDebugInfo(context.currentRoom.name, context.currentRoom);

      for (const obj of context.currentRoom.contents) {
        context.outputService.displayEntityDebugInfo(obj.that, obj);
      }

    } else {

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
