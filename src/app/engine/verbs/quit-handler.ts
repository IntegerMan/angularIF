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

    // TODO: Find a way to talk to the router (after a confirm) and navigate to the story selection screen (or the editor)
    context.output.addSystem('Quitting is not yet implemented.');

    return CommandResult.BuildFreeActionResult();
  }
}
