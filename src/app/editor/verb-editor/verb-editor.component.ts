import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';
import {VerbData} from '../../engine/story-data/verb-data';
import {EditorService} from '../editor.service';

@Component({
  selector: 'if-verb-editor',
  templateUrl: './verb-editor.component.html',
  styleUrls: ['./verb-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerbEditorComponent implements OnInit {

  @Input()
  entity: EntityData;

  @Input()
  verb: VerbData;

  constructor(private editorService: EditorService) {

  }

  ngOnInit(): void {
  }

  onDone(): void {
    this.editorService.selectNode(this.entity);
  }

}
