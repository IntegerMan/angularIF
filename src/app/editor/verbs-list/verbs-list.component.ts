import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';
import {KeyValuePair} from '../../utility/key-value-pair';

@Component({
  selector: 'if-verbs-list',
  templateUrl: './verbs-list.component.html',
  styleUrls: ['./verbs-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VerbsListComponent implements OnInit, OnChanges {

  @Input()
  entity: EntityData;

  constructor() { }

  ngOnInit() {
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateData();
  }

  private updateData() {

  }

}
