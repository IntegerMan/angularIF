import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';
import {AliasData} from '../../engine/story-data/alias-data';

@Component({
  selector: 'if-aliases-list',
  templateUrl: './aliases-list.component.html',
  styleUrls: ['./aliases-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AliasesListComponent implements OnInit, OnChanges {

  @Input()
  entity: EntityData;

  constructor() { }

  ngOnInit() {
    this.ensureAliases();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.ensureAliases();
  }

  private ensureAliases() {
    if (this.entity && !this.entity.aliases) {
      this.entity.aliases = new AliasData();
    }
  }

}
