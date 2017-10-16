import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';

export class DropHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    context.outputService.displayStory('You need to have that first before you can drop it.');

    return false;

  }

}
