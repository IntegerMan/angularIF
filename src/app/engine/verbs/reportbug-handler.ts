import {VerbHandler} from './verb-handler';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';
import {RollbarErrorHandler} from '../../utility/rollbar-error-handler';

export class ReportbugHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.system;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    const handler: RollbarErrorHandler = RollbarErrorHandler.instance;
    if (handler) {

      // TODO: It might be nice to include some basic information as to the game state
      const input = command.userInput.toLowerCase().replace('reportbug ', '');
      handler.handleError(`${context.currentRoom.key} - ${input}`);

      context.outputService.displaySystem('This message has been reported');
    } else {
      context.outputService.displayFailedAction('The error handler has not been initialized.');
    }

    return CommandResult.BuildFreeActionResult();
  }

}
