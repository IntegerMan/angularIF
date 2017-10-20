import {VerbHandler} from './verb-handler';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';

export class RestartHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    // TODO: A confirm here first would be nice...
    context.ifService.restartStory();

    return false;
  }

}
