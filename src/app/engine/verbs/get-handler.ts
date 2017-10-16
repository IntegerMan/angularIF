import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';

export class GetHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    context.outputService.displayStory('You can\'t pick that up.');

    return false;

  }

}
