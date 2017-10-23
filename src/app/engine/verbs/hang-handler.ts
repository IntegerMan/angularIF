import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';
import {CommandToken} from '../parser/command-token';

export class HangHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    if (command.objects.length < 1) {
      context.outputService.displayParserError('I don\'t understand what you\'re trying to hang.',
        'Try saying \'Hang [object name] on [target name]\'.');
      return CommandResult.BuildParseFailedResult();
    }

    const itemToHang: CommandToken = command.objects[0];

    // Verify that we're talking about is present
    if (!itemToHang.entity) {
      context.outputService.displayParserError(`You don't see ${itemToHang.userInput} here.`);
      return CommandResult.BuildParseFailedResult();
    }

    const itemToHangText: string = `${itemToHang.entity.article} ${itemToHang.entity.name}`;

    // Ensure we HAVE it first
    // TODO: it'd be nice to auto-pick-up the item.
    if (!context.player.containsEntity(itemToHang.entity, true)) {
      context.outputService.displayParserError(`You'll have to get ${itemToHangText} before you can hang it.`);
      return CommandResult.BuildParseFailedResult();
    }

    // Next, let's see if we can determine what we're trying to hang the item on.
    const hanger: CommandToken = command.getPrepositionWithFallbacks(['on', 'using', 'with', 'under', 'below']);

    // We couldn't figure out what we were trying to hang the object on
    if (!hanger) {

      // Check to see if the user was trying a hang ... in X
      if (command.getProposition('in')) {
        context.outputService.displayParserError(`You can't hang something inside of something else!`);
      } else {
        context.outputService.displayParserError(`I don't understand what you're trying to hang ${itemToHangText} on.`,
          `Try saying 'Hang ${itemToHangText} on [object name]'.`);
      }

      return CommandResult.BuildActionFailedResult();
    }

    context.outputService.displayStory(`Hanging isn't fully implemented yet. You could always just drop things.`);
    return CommandResult.BuildActionFailedResult();
  }
}
