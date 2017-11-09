import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {RoomData} from '../../engine/story-data/room-data';
import {StoryData} from '../../engine/story-data/story-data';

@Component({
  selector: 'if-room-editor',
  templateUrl: './room-editor.component.html',
  styleUrls: ['./room-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoomEditorComponent implements OnInit {

  @Input()
  room: RoomData;

  @Input()
  story: StoryData;

  selectedTab: number = 0;

  constructor() { }

  ngOnInit() {
    $('ul.tabs').tabs();
  }

  addObject(): void {
    // TODO: Duh
  }

  selectTab(number: number) {
    this.selectedTab = number;
  }
}
