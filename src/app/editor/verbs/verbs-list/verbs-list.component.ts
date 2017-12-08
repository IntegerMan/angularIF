import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../../engine/story-data/entity-data';
import {EditorService} from '../../editor.service';

@Component({
  selector: 'if-verbs-list',
  templateUrl: './verbs-list.component.html',
  styleUrls: ['./verbs-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VerbsListComponent implements OnInit {

  @Input()
  entity: EntityData;

  constructor(private editorService: EditorService) {

  }

  ngOnInit() {
  }

  onAddClicked(): void {
    this.editorService.addVerb();
  }

}
