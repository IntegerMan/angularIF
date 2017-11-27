import {EntityData} from './entity-data';
import {RoomEvents} from './room-events';
import {DirectionData} from './direction-data';

export class RoomData extends EntityData {

  // This is effectively a dictionary of direction names
  nav: {};
  directions: DirectionData[];

  // Events
  events: RoomEvents;

}
