import {Command} from '../tokenizer/command';
import {CommandContext} from '../command-context';
import {LookHandler} from './look-handler';

export class ExamineHandler extends LookHandler {

  handleCommand(command: Command, context: CommandContext): boolean {
    return super.handleLookOrExamine(command, context, true);
  }

}
