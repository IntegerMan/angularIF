import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';
import {AliasData} from '../../engine/story-data/alias-data';
import {ArrayHelper} from '../../utility/array-helper';
import {EditorService} from '../editor.service';

@Component({
  selector: 'if-aliases-list',
  templateUrl: './aliases-list.component.html',
  styleUrls: ['./aliases-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AliasesListComponent implements OnInit, OnChanges {

  @Input()
  entity: EntityData;

  constructor(private editorService: EditorService) {

  }

  ngOnInit() {
    this.ensureAliases();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ensureAliases();
  }

  onRemoveClick(token: string) {
    ArrayHelper.removeIfPresent(this.entity.aliases.adjectives, token);
    ArrayHelper.removeIfPresent(this.entity.aliases.nouns, token);
    console.warn(this.entity.aliases);
  }

  onAddClicked(): void {
    this.editorService.addAlias();
  }

  private ensureAliases(): void {
    if (this.entity && !this.entity.aliases) {
      this.entity.aliases = new AliasData();
    }
  }

}
