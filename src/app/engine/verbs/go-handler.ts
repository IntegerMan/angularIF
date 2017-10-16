import {VerbHandler} from './verb-handler';
import {CommandContext} from '../command-context';
import {Command} from '../tokenizer/command';
import {CommandToken} from '../tokenizer/command-token';
import {TokenClassification} from '../tokenizer/token-classification.enum';
import {Room} from '../room';

export class GoHandler extends VerbHandler {

  handleCommand(command: Command, context: CommandContext): boolean {

    let direction: CommandToken = this.getFirstDirection(command);

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

    const target: Room = context.navService.getLinkedRoom(room, direction.name);

    if (!target) {
      context.outputService.displayStory('You can\'t go that way.');
      return false;
    }

    // TODO: Update the player's location
    context.outputService.displayStory(`You go ${direction.name}.`);
    return true;

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
