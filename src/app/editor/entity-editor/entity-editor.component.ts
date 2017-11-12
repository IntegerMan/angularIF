import { EditorService } from '../editor.service';
import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {StoryData} from '../../engine/story-data/story-data';
import {ItemData} from '../../engine/story-data/item-data';
import {VerbData} from '../../engine/story-data/verb-data';

@Component({
  selector: 'if-entity-editor',
  templateUrl: './entity-editor.component.html',
  styleUrls: ['./entity-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EntityEditorComponent implements OnInit, OnChanges {

  @Input()
  story: StoryData;

  @Input()
  entity: ItemData;

  selectedTab: string = 'info';
  lookVerb: VerbData;

  constructor(private editorService: EditorService) {
   }

  ngOnInit() {
    $('ul.tabs').tabs();
    this.updateLookVerb();
  }

  ngOnChanges(changes: SimpleChanges) {
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
    const lookVerb = this.entity.verbData.filter(v => v.name === 'look');
    if (lookVerb && lookVerb.length > 0) {
      this.lookVerb = lookVerb[0];
    } else {
      this.lookVerb = undefined;
    }
  }

}
