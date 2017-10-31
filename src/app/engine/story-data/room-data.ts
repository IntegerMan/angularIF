import {InvokeRequest} from './invoke-request';
import {EntityData} from './entity-data';
import {RoomEvents} from './room-events';

export class RoomData extends EntityData {

  isDark: boolean;
  darkName: string;
  darkDescription: string;

  // This is effectively a dictionary of direction names
  nav: {};

  // Events
  events: RoomEvents;

}
