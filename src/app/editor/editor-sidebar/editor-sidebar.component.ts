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

  selectedNode: any;

  private nodeSubscription: Subscription;

  constructor(private editorService: EditorService) {
    this.nodeSubscription = this.editorService.nodeSelected.subscribe(n => this.selectedNode = n);
    this.selectedNode = null;
  }

  ngOnInit() {
    this.onStoryInfoClick();
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

  onAddActorClick(): void {
    this.editorService.addActor();    
  }

  onAddRoomClick(): void {
    this.editorService.addRoom();
  }

}
