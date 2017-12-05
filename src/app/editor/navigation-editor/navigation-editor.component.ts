import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {DirectionData} from '../../engine/story-data/direction-data';
import {EditorService} from '../editor.service';

@Component({
  selector: 'if-navigation-editor',
  templateUrl: './navigation-editor.component.html',
  styleUrls: ['./navigation-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationEditorComponent implements OnInit, OnChanges {

  @Input()
  dir: DirectionData;

  private roomKeys: string[];

  constructor(private editorService: EditorService) {
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

  }
}
