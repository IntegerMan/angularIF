import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {VerbData} from '../../../engine/story-data/verb-data';
import {EditorService} from '../../editor.service';
import {EntityData} from '../../../engine/story-data/entity-data';

@Component({
  selector: 'if-verb-card',
  templateUrl: './verb-card.component.html',
  styleUrls: ['./verb-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VerbCardComponent implements OnInit {

  @Input()
  entity: EntityData;

  @Input()
  verb: VerbData;

  constructor(private editorService: EditorService) { }

  ngOnInit(): void {
  }

  edit(): void {
    this.editorService.editVerb(this.verb, this.entity);
  }

  delete(): void {
    this.editorService.deleteVerb(this.verb, this.entity);
  }

}
