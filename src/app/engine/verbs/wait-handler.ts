import {VerbHandler} from './verb-handler';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';

export class WaitHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.look;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    context.output.addStory('Time passes...');

    return CommandResult.BuildActionSuccessResult();

  }


}
