import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';

export class GoHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    context.outputService.displayStory('You can\'t go there.');

    return false;

  }

}
