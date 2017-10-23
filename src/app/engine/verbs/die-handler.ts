import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';
import {Confirmation} from 'primeng/primeng';

export class DieHandler extends VerbHandler {

  get isHidden(): boolean {
    return true;
  }

  get verbType(): VerbType {
    return VerbType.system;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    const confirmation: Confirmation = {
      message: 'Are you sure you want to just give up?',
      header: 'Give up?',
      accept: () => context.ifService.endGame(false),
      reject: () => context.outputService.displaySystem('The story must go on...')
    };

    context.confirmService.confirm(confirmation);

    return CommandResult.BuildActionSuccessResult();

  }
}
