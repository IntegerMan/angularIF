import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';

export class HangHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    if (command.objects.length < 1) {
      const text = `I don't understand what you're trying to hang. Try saying 'Hang [object name] on [target name]'.`;
      context.outputService.displayParserError(text);
      return CommandResult.BuildParseFailedResult();
    }

    context.outputService.displayStory(`Hanging isn't fully implemented yet. You could always just drop things.`);
    return CommandResult.BuildActionFailedResult();
  }
}
