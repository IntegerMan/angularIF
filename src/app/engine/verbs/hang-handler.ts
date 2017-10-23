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

    const that: string = `${itemToHang.entity.article} ${itemToHang.entity.name}`;

    // If it's alive, shame the player.
    if (itemToHang.entity.isAlive) {
      if (itemToHang.entity === context.player) {
        context.outputService.displayStory(`That's awfully morbid. Killing yourself never solved anything.`);
      } else {
        // TODO: If we have hostile entities, this should be tweaked.
        context.outputService.displayStory(`You think about hanging ${that} but then remember that you're not a sociopath.`);
      }
      return CommandResult.BuildActionFailedResult();
    }

    // Ensure we HAVE it first
    // TODO: it'd be nice to auto-pick-up the item.
    if (!context.player.containsEntity(itemToHang.entity, true)) {
      context.outputService.displayParserError(`You'll have to get ${that} before you can hang it.`);
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
        context.outputService.displayParserError(`I don't understand what you're trying to hang ${that} on.`,
          `Try saying 'Hang ${that} on [object name]'.`);
      }

      return CommandResult.BuildActionFailedResult();
    }

    context.outputService.displayStory(`Hanging isn't fully implemented yet. You could always just drop things.`);
    return CommandResult.BuildActionFailedResult();
  }
}
