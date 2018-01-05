import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';
import {ConfirmTask} from '../../common-ui/confirm-task';

export class DieHandler extends VerbHandler {

  get isHidden(): boolean {
    return true;
  }

  get verbType(): VerbType {
    return VerbType.system;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    const confirmation: ConfirmTask = {
      message: 'Are you sure you want to just give up?',
      header: 'Give up?',
      accept: () => context.engine.endGame(context, false),
      reject: () => context.output.addSystem('The story must go on...')
    };

    if (context.confirmService) {
      context.confirmService.confirm(confirmation);
    }

    return CommandResult.BuildActionSuccessResult();

  }
}
