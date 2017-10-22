import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';

export class QuitHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.system;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {
    context.outputService.displaySystem('Quitting will eventually bring you back to a main menu, but this is not yet implemented.');

    return CommandResult.BuildFreeActionResult();
  }
}
