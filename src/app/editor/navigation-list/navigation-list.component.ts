import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {RoomData} from '../../engine/story-data/room-data';
import {KeyValuePair} from '../../utility/key-value-pair';
import {DirectionData} from '../../engine/story-data/direction-data';

@Component({
  selector: 'if-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationListComponent implements OnInit, OnChanges {

  @Input()
  room: RoomData;
  directions: DirectionData[];

  constructor() {
    this.directions = [];
  }

  ngOnInit() {
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateData();
  }

  private updateData() {
    this.directions.length = 0;
    if (this.room && this.room.nav) {
      for (const key of Object.getOwnPropertyNames(this.room.nav)) {

        const val = this.room.nav[key];

        const direction: any = new DirectionData();
        direction.key = key;

        if (typeof val === 'string') {
          direction.room = val;
        } else {
          const dir: DirectionData = val;
          direction.room = dir.room;
          direction.goMessage = dir.goMessage;
          direction.lookMessage = dir.lookMessage;
        }

        this.directions.push(direction);
      }
    }
  }

}
