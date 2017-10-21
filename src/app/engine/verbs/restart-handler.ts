import {VerbHandler} from './verb-handler';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {Confirmation} from 'primeng/components/common/confirmation';
import {VerbType} from './verb-type.enum';

export class RestartHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.system;
  }

  handleCommand(command: Command, context: CommandContext): boolean {

    const confirmation: Confirmation = {
      message: 'Are you sure you want to restart? All current progress will be lost.',
      accept: () => context.ifService.restartStory(),
      reject: () => context.outputService.displaySystem('The story must go on...')
    };

    context.confirmService.confirm(confirmation);

    return false;
  }

}
