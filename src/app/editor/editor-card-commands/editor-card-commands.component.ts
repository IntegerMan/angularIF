import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EditorService} from '../editor.service';
import {EntityData} from '../../engine/story-data/entity-data';
import {RoomData} from '../../engine/story-data/room-data';

@Component({
  selector: 'if-editor-card-commands',
  templateUrl: './editor-card-commands.component.html',
  styleUrls: ['./editor-card-commands.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorCardCommandsComponent implements OnInit {

  @Input()
  entity: EntityData;

  @Input()
  selectedTab: string;

  constructor(private editorService: EditorService) { }

  ngOnInit() {
  }

  addObject(): void {
    this.editorService.addObject();
  }

  addAlias(): void {
    this.editorService.addAlias();
  }

  addAttribute(): void {
    this.editorService.addAttribute();
  }

  playStoryHere(): void {
    this.editorService.playStory(<RoomData>this.entity);
  }
}
