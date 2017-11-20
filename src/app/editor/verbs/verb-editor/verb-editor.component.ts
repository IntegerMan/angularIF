import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../../engine/story-data/entity-data';
import {VerbData} from '../../../engine/story-data/verb-data';
import {EditorService} from '../../editor.service';

@Component({
  selector: 'if-verb-editor',
  templateUrl: './verb-editor.component.html',
  styleUrls: ['./verb-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerbEditorComponent implements OnInit, OnChanges {

  @Input()
  entity: EntityData;

  @Input()
  verb: VerbData;

  responseItems: any[];

  constructor(private editorService: EditorService) {
    this.responseItems = [];
  }

  ngOnInit(): void {
    this.ngOnChanges(null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.responseItems.length = 0;

    if (this.verb.handler && this.verb.handler instanceof Array) {
      // We want a clone of the data, not the reference itself. This is important since we're going to truncate it later
      this.responseItems = this.verb.handler.slice();
    } else {
      this.responseItems.push(this.verb.handler);
    }
  }

  onDone(): void {
    this.editorService.selectNode(this.entity);
  }

  addResponse(): void {
    this.editorService.addResponse(this.verb);
  }

  getItemType(item: any): string {

    const itemType = typeof (item);

    if (item && itemType === 'string') {
      return 'string';
    }

    if (itemType === 'object') {
      if (item.type) {
        return item.type;
      }
      if (item.invoke) {
        return 'invoke';
      }
    }

    return itemType;
  }
}
