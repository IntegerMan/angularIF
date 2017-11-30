import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {CommandToken} from '../parser/command-token';
import {Room} from '../entities/room';
import {RoomLink} from '../room-link';
import {VerbType} from './verb-type.enum';
import {CommandResult} from '../command-result';
import {InteractiveFictionEngine} from '../interactive-fiction-engine';

export class GoHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.go;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    let link: RoomLink = null;
    const room: Room = context.currentRoom;

    const direction: CommandToken = command.getFirstDirection();
    if (direction) {
      if (direction.entity && direction.entity instanceof RoomLink) {
        link = direction.entity;
      } else {
        link = room.roomLink[direction.name];
      }
    }

    if (!link) {
      context.output.addParserError('In order to go somewhere, you must include a direction.',
        'Try saying "Go East" or, simply, "East" or "E" to move in a direction.');
      return CommandResult.BuildParseFailedResult();
    }

    // Send the verb preview event
    const dirName: string = link.direction;
    if (!room.sendPreviewEvent(context, this.name, {room, dirName, link})) {
      return CommandResult.BuildActionFailedResult();
    }

    // Send the leave preview event
    if (!room.sendPreviewEvent(context, 'leave', {room, dirName, link})) {
      return CommandResult.BuildActionFailedResult();
    }

    if (!link) {
      context.output.addStory('You can\'t go that way.');
      return CommandResult.BuildActionFailedResult();
    }

    const newRoom: Room = link.target;

    // Send the enter preview event
    if (newRoom && !newRoom.sendPreviewEvent(context, 'enter', {room, dirName, link})) {
      return CommandResult.BuildActionFailedResult();
    }

    // If we got here, all preview events had a chance to intercept it and they failed. Keep on going

    // Regardless of success or failure, we'll want to go with the customized message
    if (link.goResponse) {
      link.goResponse.invoke(context, link);
    }

    // Verify we're going somewhere. Some links are just for failure messages
    if (!newRoom) {

      if (!link.goResponse) {
        context.output.addStory('Unseen forces prevent you from going that way.');
      }

      return CommandResult.BuildActionFailedResult();
    }

    // Give a generic message
    if (!link.goResponse) {
      context.output.addStory(`You go ${dirName}.`);
    }

    // Move the player
    InteractiveFictionEngine.setActorRoom(context.player, newRoom);

    // Send events to the old room
    room.sendEvent(context, 'onLeave', link);
    room.sendEvent(context, this.name, {room, dirName, link});

    // Send the arrive event to the new room
    newRoom.sendEvent(context, 'onEnter', link);

    return CommandResult.BuildActionSuccessResult();

  }

}
