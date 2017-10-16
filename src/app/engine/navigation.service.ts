import { Injectable } from '@angular/core';
import {Room} from './room';
import {RoomLink} from './room-link';

@Injectable()
export class NavigationService {

  constructor() {

  }

  public navTo(origin: any, direction: string, target: Room = null, message: string = null): RoomLink {

    if (!origin.roomLink) {
      origin.roomLink = {};
    }

    const link = new RoomLink(origin, direction, target);
    link.message = message;

    origin.roomLink[direction] = link;

    return link;
  }

  public getLink(origin: any, direction: string): RoomLink {

    if (!origin || !direction || !origin.roomLink) {
      return null;
    }

    return origin.roomLink[direction];

  }

  public northTo(origin: Room, target: Room = null, message: string = null): RoomLink {
    return this.navTo(origin, 'north', target, message);
  }

  public eastTo(origin: Room, target: Room = null, message: string = null): RoomLink {
    return this.navTo(origin, 'east', target, message);
  }

  public southTo(origin: Room, target: Room = null, message: string = null): RoomLink {
    return this.navTo(origin, 'south', target, message);
  }

  public westTo(origin: Room, target: Room = null, message: string = null): RoomLink {
    return this.navTo(origin, 'west', target, message);
  }

}
