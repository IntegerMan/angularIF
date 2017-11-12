import { EditorService } from '../editor.service';
import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {RoomData} from '../../engine/story-data/room-data';
import {StoryData} from '../../engine/story-data/story-data';
import {VerbData} from '../../engine/story-data/verb-data';

@Component({
  selector: 'if-room-editor',
  templateUrl: './room-editor.component.html',
  styleUrls: ['./room-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoomEditorComponent implements OnInit, OnChanges {

  @Input()
  room: RoomData;

  @Input()
  story: StoryData;

  selectedTab: string = 'info';
  lookVerb: VerbData;

  constructor(private editorService: EditorService) {

  }

  ngOnInit() {
    $('ul.tabs').tabs();
    this.updateLookVerb();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateLookVerb();
  }

  addObject(): void {
    this.editorService.addObject();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  private updateLookVerb() {
    // A common case is wanting to know what the look description will be, so include that center stage
    const lookVerb = this.room.verbData.filter(v => v.name === 'look');
    if (lookVerb && lookVerb.length > 0) {
      this.lookVerb = lookVerb[0];
    } else {
      this.lookVerb = undefined;
    }
  }

}
