import {Component, Input, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';

@Component({
  selector: 'if-attributes-list',
  templateUrl: './attributes-list.component.html',
  styleUrls: ['./attributes-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AttributesListComponent {

  @Input()
  entity: EntityData;

}
