import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';

export class OpenHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    context.outputService.displayStory('You don\'t need to open that.');

    return CommandResult.BuildActionFailedResult();

  }

}
