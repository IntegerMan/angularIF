import { EditorService } from '../editor.service';
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {StoryData} from '../../engine/story-data/story-data';
import {ItemData} from '../../engine/story-data/item-data';

@Component({
  selector: 'if-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EntityEditorComponent implements OnInit {

  @Input()
  story: StoryData;

  @Input()
  entity: ItemData;

  selectedTab: number = 0;

  constructor(private editorService: EditorService) {
   }

  ngOnInit() {
    $('ul.tabs').tabs();
  }

  addObject(): void {
    this.editorService.addObject();
  }

  selectTab(number: number) {
    this.selectedTab = number;
  }

}
