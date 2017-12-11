import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActorData} from '../../engine/story-data/actor-data';
import {StoryData} from '../../engine/story-data/story-data';

@Component({
  selector: 'if-actor-editor',
  templateUrl: './actor-editor.component.html',
  styleUrls: ['./actor-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ActorEditorComponent implements OnInit {

  @Input()
  story: StoryData;

  @Input()
  actor: ActorData;

  selectedTab: string = 'info';
  roomKeys: string[];

  constructor() {
    this.roomKeys = [];
  }

  ngOnInit() {

    $('ul.tabs').tabs();

    this.updateRoomOptions();

  }

  selectTab(name: string) {
    this.selectedTab = name;
  }

  private updateRoomOptions() {
    this.roomKeys.length = 0;
    if (this.story) {
      this.story.rooms.forEach(r => this.roomKeys.push(r.key));
    }
    this.roomKeys.sort();
  }

}
