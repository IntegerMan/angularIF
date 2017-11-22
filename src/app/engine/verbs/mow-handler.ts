import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';

export class MowHandler extends VerbHandler {

  get isHidden(): boolean {
    return false;
  }

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    const verbName = command.verb.name;

    const text = `If you wanted to ${verbName}, you probably should have done it before there were more pressing things to attend to.`;
    const hint = `You won't need to ${verbName} to finish the story.`;

    context.outputService.displayStory(text, hint);

    return CommandResult.BuildActionFailedResult();

  }
}
