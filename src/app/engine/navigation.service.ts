import { Injectable } from '@angular/core';
import {Room} from './room';

@Injectable()
export class NavigationService {

  constructor() {

  }

  public navTo(origin: any, target: Room, direction: string): void {

    if (!origin.navMesh) {
      origin.navMesh = {};
    }

    origin.navMesh[direction] = target;

  }

  public getLinkedRoom(origin: any, direction: string): Room {

    if (!origin || !direction || !origin.navMesh) {
      return null;
    }

    return origin.navMesh[direction];

  }

  public southTo(origin: Room, target: Room): void {
    this.navTo(origin, target, 'south');
  }

  public westTo(origin: Room, target: Room): void {
    this.navTo(origin, target, 'west');
  }

  public eastTo(origin: Room, target: Room): void {
    this.navTo(origin, target, 'east');
  }

  public northTo(origin: Room, target: Room): void {
    this.navTo(origin, target, 'north');
  }

}
