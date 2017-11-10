import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {StoryData} from '../../engine/story-data/story-data';

@Component({
  selector: 'if-editor-sidebar',
  templateUrl: './editor-sidebar.component.html',
  styleUrls: ['./editor-sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorSidebarComponent implements OnInit {

  @Input()
  story: StoryData;

  @Output()
  nodeSelected: EventEmitter<any>;
  selectedNode: any;

  constructor() {
    this.nodeSelected = new EventEmitter<any>();
    this.selectedNode = null;
  }

  ngOnInit() {
    this.onStoryInfoClick();
  }

  onActorClick(actor: any) {
    actor.nodeType = 'actor';
    this.selectNode(actor);
  }

  onRoomClick(room: any) {
    room.nodeType = 'room';
    this.selectNode(room);
  }

  onStoryInfoClick() {
    (<any>this.story).nodeType = 'storyInfo';
    this.selectNode(this.story);
  }

  private selectNode(node: any) {
    this.selectedNode = node;
    this.nodeSelected.emit(node);
  }

}
