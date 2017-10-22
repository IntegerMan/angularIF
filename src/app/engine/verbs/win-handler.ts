import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';
import {environment} from '../../../environments/environment';

export class WinHandler extends VerbHandler {

  get isHidden(): boolean {
    return true;
  }

  get verbType(): VerbType {
    return VerbType.system;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    // Win is not a valid verb in production
    if (environment.production) {
      context.outputService.displaySystem('Cheaters never prosper.');

      return CommandResult.BuildActionSuccessResult();
    }

    // But in dev it is!
    context.ifService.endGame(true, 'Well, that was easy.');

    return CommandResult.BuildActionSuccessResult();

  }
}
