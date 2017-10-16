import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';
import {CommandToken} from '../tokenizer/command-token';

export class LookHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    // If it's just a plain old look without a target, describe the room
    if (command.objects.length <= 0) {

      context.ifService.describeRoom(context.player, context.currentRoom);

      return true;
    }

    const token: CommandToken = command.objects[0];

    context.outputService.displayStory(`You stare at the ${token.name} for awhile, but fail to notice anything more noteworthy.`);

    return false;

  }

}
