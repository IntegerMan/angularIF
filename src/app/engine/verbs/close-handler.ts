import {VerbHandler} from './verb-handler';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';

export class CloseHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    context.outputService.displayStory('You can\'t close that.');

    return false;

  }


}
