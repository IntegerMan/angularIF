import {EntityData} from './entity-data';
import {RoomEvents} from './room-events';

export class RoomData extends EntityData {

  // This is effectively a dictionary of direction names
  nav: {};

  // Events
  events: RoomEvents;

}
