import {VerbHandler} from './verb-handler';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {Confirmation} from 'primeng/components/common/confirmation';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';

export class RestartHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.system;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    if (context.engine.isGameOver) {

      context.engine.restartStory();

    } else {

      const confirmation: Confirmation = {
        message: 'Are you sure you want to restart? All current progress will be lost.',
        header: 'Restart?',
        accept: () => context.engine.restartStory(),
        reject: () => context.output.addSystem('The story must go on...')
      };

      if (context.confirmService) {
        context.confirmService.confirm(confirmation);
      }
    }

    return CommandResult.BuildFreeActionResult();
  }

}
