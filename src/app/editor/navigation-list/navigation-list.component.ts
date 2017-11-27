import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {RoomData} from '../../engine/story-data/room-data';
import {DirectionData} from '../../engine/story-data/direction-data';
import {EditorService} from '../editor.service';

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
  roomKeys: string[];

  constructor(private editorService: EditorService) {
    this.directions = [];
    this.roomKeys = [];
  }

  ngOnInit() {
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateData();
  }

  private updateData() {

    // Update the room keys
    this.roomKeys.length = 0;
    for (const r of this.editorService.storyData.rooms) {
      this.roomKeys.push(r.key);
    }

    // Update the directional navigation
    this.directions.length = 0;
    if (this.room && this.room.directions) {
      for (const dir of this.room.directions) {
        this.directions.push(dir);
      }
    }
  }

}
