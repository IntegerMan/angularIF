import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {LookHandler} from './look-handler';
import {VerbType} from './verb-type.enum';

export class ExamineHandler extends LookHandler {

  get verbType(): VerbType {
    return VerbType.look;
  }

  handleCommand(command: Command, context: CommandContext): boolean {
    return super.handleLookOrExamine(command, context, true);
  }

}
