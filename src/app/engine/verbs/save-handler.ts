import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';

export class SaveHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.system;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {
    context.outputService.displaySystem('Saving your game is not yet supported.');

    return CommandResult.BuildFreeActionResult();
  }
}
