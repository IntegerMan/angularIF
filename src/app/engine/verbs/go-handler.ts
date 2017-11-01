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

    const link: RoomLink = room.roomLink[direction.name];

    // Send the verb preview event
    if (!room.sendPreviewEvent(context, this.name, {room, direction, link})) {
      return CommandResult.BuildActionFailedResult();
    }

    // Send the leave preview event
    if (!room.sendPreviewEvent(context, 'leave', {room, direction, link})) {
      return CommandResult.BuildActionFailedResult();
    }

    if (!link) {
      context.outputService.displayStory('You can\'t go that way.');
      return CommandResult.BuildActionFailedResult();
    }

    const newRoom: Room = link.target;

    // Send the enter preview event
    if (newRoom && !newRoom.sendPreviewEvent(context, 'enter', {room, direction, link})) {
      return CommandResult.BuildActionFailedResult();
    }

    // If we got here, all preview events had a chance to intercept it and they failed. Keep on going

    // Regardless of success or failure, we'll want to go with the customized message
    if (link.goResponse) {
      link.goResponse.invoke(context);
    }

    // Verify we're going somewhere. Some links are just for failure messages
    if (!newRoom) {

      if (!link.goResponse) {
        context.outputService.displayStory('Unseen forces prevent you from going that way.');
      }

      return CommandResult.BuildActionFailedResult();
    }

    // Give a generic message
    if (!link.goResponse) {
      context.outputService.displayStory(`You go ${direction.name}.`);
    }

    // Move the player
    context.ifService.setActorRoom(context.player, newRoom);

    // Send events to the old room
    room.sendEvent(context, 'onLeave', link);
    room.sendEvent(context, this.name, {room, direction, link});

    // Send the arrive event to the new room
    newRoom.sendEvent(context, 'onEnter', link);

    return CommandResult.BuildActionSuccessResult();

  }

}
