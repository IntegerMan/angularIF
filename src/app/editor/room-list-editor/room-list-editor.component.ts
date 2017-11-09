import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {StoryData} from '../../engine/story-data/story-data';
import {RoomData} from '../../engine/story-data/room-data';

@Component({
  selector: 'if-room-list-editor',
  templateUrl: './room-list-editor.component.html',
  styleUrls: ['./room-list-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoomListEditorComponent implements OnInit {

  @Input()
  story: StoryData;

  constructor() { }

  ngOnInit() {
  }

  addRoom(): void {

    const roomData = new RoomData();
    roomData.key = 'newRoom';
    roomData.name = 'New Room';

    this.story.rooms.push(roomData);
  }
}
