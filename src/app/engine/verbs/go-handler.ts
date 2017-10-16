import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';
import {CommandToken} from '../tokenizer/command-token';
import {TokenClassification} from '../tokenizer/token-classification.enum';
import {Room} from '../room';
import {RoomLink} from '../room-link';

export class GoHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    const direction: CommandToken = this.getFirstDirection(command);

    // If we don't have an explicit direction, grab the first noun and assume that will map to a direction somehow
    /*
    if (!direction && command.objects && command.objects.length > 0) {
      direction = command.objects[0];
    }
    */

    if (!direction) {
      context.outputService.displayParserError('In order to go somewhere, you must include a direction. For example: "Go East"');
      return false;
    }

    const room: Room = context.currentRoom;

    const link: RoomLink = context.navService.getLink(room, direction.name);

    if (!link) {
      context.outputService.displayStory('You can\'t go that way.');
      return false;
    }

    // Regardless of success or failure, we'll want to go with the customized message
    if (link.message) {
      context.outputService.displayStory(link.message);
    }

    if (link.target) {

      if (!link.message) {
        context.outputService.displayStory(`You go ${direction.name}.`);
      }

      // Move the player
      context.ifService.setActorRoom(context.player, link.target);

      return true;

    } else {

      if (!link.message) {
        context.outputService.displayStory('Unseen forces prevent you from going that way.');
      }

      return false;
    }

  }

  private getFirstDirection(command: Command): CommandToken {
    let direction: CommandToken = null;

    const directions: CommandToken[] = command.objects.filter(o => o.classification === TokenClassification.Direction);
    if (directions && directions.length > 0) {
      direction = directions[0];
    }

    return direction;
  }
}
