import {Room} from './entities/room';
import {StoryResponse} from './responses/story-response';
import {EntityBase} from './entities/entity-base';
import {CommandContext} from './command-context';
import {CommandToken} from './parser/command-token';

/**
 * Represents a unidirectional link from one room to a direction from that room, possibly resulting in navigation into another room. This
 * also contains information on displaying navigational messages, attempted and failed navigation, etc. Note that target is *not* required.
 */
export class RoomLink extends EntityBase {

  origin: Room;
  direction: string;
  target: Room;

  goResponse: StoryResponse = null;
  lookResponse: StoryResponse = null;

  constructor(origin: Room, direction: string, target: Room) {
    super(direction, direction);

    this.origin = origin;
    this.direction = direction;
    this.target = target;

  }

  isDescribedByToken(token: CommandToken, context: CommandContext): boolean {

    // Return true on direct match for the direction
    if (token.name === this.direction) {
      return true;
    }

    // Search by nouns registered for the object
    for (const noun of this.nouns) {
      if (noun === token.name) {
        return true;
      }
    }

    // Adjective matches without a noun match are probably a pretty bad idea, but let's do that for now
    for (const adj of this.adjectives) {
      if (adj === token.name) {
        return true;
      }
    }

    // No prayer
    return false;
  }
}
