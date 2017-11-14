import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {StoryData} from '../../engine/story-data/story-data';
import {EditorService} from '../editor.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'if-editor-sidebar',
  templateUrl: './editor-sidebar.component.html',
  styleUrls: ['./editor-sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorSidebarComponent implements OnInit, OnDestroy {

  @Input()
  story: StoryData;

  json: any;

  selectedNode: any;

  sidebarHeight: number;

  private nodeSubscription: Subscription;

  constructor(private editorService: EditorService) {
    this.nodeSubscription = this.editorService.nodeSelected.subscribe(n => this.selectedNode = n);
    this.selectedNode = null;

    // Special menu option to allow selecting the JSON option
    this.json = { nodeType: 'json'};
  }

  ngOnInit() {
    this.onStoryInfoClick();
    this.onResize();
  }

  ngOnDestroy() {
    if (this.nodeSubscription) {
      this.nodeSubscription.unsubscribe();
    }
  }

  onActorClick(actor: any) {
    this.editorService.selectNode(actor, 'actor');
  }

  onObjectClick(entity: any) {
    this.editorService.selectNode(entity, 'entity');
  }

  onRoomClick(room: any) {
    this.editorService.selectNode(room, 'room');
  }

  onStoryInfoClick() {
    this.editorService.selectNode(this.story, 'storyInfo');
  }

  onStringsClick() {
    this.editorService.selectNode(this.story.strings, 'strings');
  }

  onJSONClick() {
    this.editorService.selectNode(this.json);
  }

  onAddActorClick(): void {
    this.editorService.addActor();
  }

  onAddRoomClick(): void {
    this.editorService.addRoom();
  }

  onResize(): void {
    this.sidebarHeight = window.innerHeight - 120;
  }
}
