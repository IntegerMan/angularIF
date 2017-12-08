import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';
import {ItemData} from '../../engine/story-data/item-data';
import {EditorService} from '../editor.service';

@Component({
  selector: 'if-contents-list',
  templateUrl: './contents-list.component.html',
  styleUrls: ['./contents-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentsListComponent implements OnInit {

  @Input()
  entity: EntityData;

  constructor(private editorService: EditorService) {

  }

  ngOnInit() {
  }

  onObjectClick(obj: ItemData) {
    this.editorService.selectNode(obj, 'entity');
  }

  onAddClicked(): void {
    this.editorService.addObject();
  }

}
