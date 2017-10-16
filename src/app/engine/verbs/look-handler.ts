import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';

export class LookHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    context.outputService.displayStory('You stare at it for awhile, but fail to notice anything more noteworthy.');

    return false;

  }

}
