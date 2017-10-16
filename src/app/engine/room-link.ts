import {Room} from './room';

/**
 * Represents a unidirectional link from one room to a direction from that room, possibly resulting in navigation into another room. This
 * also contains information on displaying navigational messages, attempted and failed navigation, etc. Note that target is *not* required.
 */
export class RoomLink {

  constructor(origin: Room, direction: string, target: Room) {
    this.origin = origin;
    this.direction = direction;
    this.target = target;
  }

  origin: Room;
  direction: string;
  target: Room;
  message: string = null;

}
