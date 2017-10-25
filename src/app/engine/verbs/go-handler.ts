import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {CommandToken} from '../parser/command-token';
import {Room} from '../entities/room';
import {RoomLink} from '../room-link';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';

export class GoHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.go;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    const direction: CommandToken = command.getFirstDirection();

    if (!direction) {
      context.outputService.displayParserError('In order to go somewhere, you must include a direction.',
        'Try saying "Go East" or, simply, "East" or "E" to move in a direction.');
      return CommandResult.BuildParseFailedResult();
    }

    const room: Room = context.currentRoom;

    const link: RoomLink = context.navService.getLink(room, direction.name);

    if (!link) {
      context.outputService.displayStory('You can\'t go that way.');
      return CommandResult.BuildActionFailedResult();
    }

    // Regardless of success or failure, we'll want to go with the customized message
    if (link.goMessage) {
      context.outputService.displayStory(link.goMessage);
    }

    if (link.target) {

      if (!link.goMessage) {
        context.outputService.displayStory(`You go ${direction.name}.`);
      }

      // Move the player
      context.ifService.setActorRoom(context.player, link.target);

      return CommandResult.BuildActionSuccessResult();

    } else {

      if (!link.goMessage) {
        context.outputService.displayStory('Unseen forces prevent you from going that way.');
      }

      return CommandResult.BuildActionFailedResult();
    }

  }

}
