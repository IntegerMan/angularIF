import {VerbHandler} from './verb-handler';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {VerbType} from './verb-type.enum';

export class CloseHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): boolean {

    context.outputService.displayStory('You can\'t close that.');

    return false;

  }


}
