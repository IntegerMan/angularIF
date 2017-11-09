import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';
import {KeyValuePair} from '../../utility/key-value-pair';

@Component({
  selector: 'if-attributes-list',
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AttributesListComponent implements OnInit, OnChanges {

  @Input()
  entity: EntityData;
  kvps: KeyValuePair[];

  constructor() {
    this.kvps = [];
  }

  ngOnInit() {
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateData();
  }

  private updateData() {
    this.kvps.length = 0;
    if (this.entity && this.entity.attributes) {
      for (const key of Object.getOwnPropertyNames(this.entity.attributes)) {
        const kvp = new KeyValuePair(key, this.entity.attributes[key]);
        this.kvps.push(kvp);
      }
    }
  }
}
