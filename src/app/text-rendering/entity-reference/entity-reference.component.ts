import {Component, Input, OnInit} from '@angular/core';
import {WorldEntity} from '../../engine/world-entity';

@Component({
  selector: 'if-entity-reference',
  templateUrl: './entity-reference.component.html',
  styleUrls: ['./entity-reference.component.css']
})
export class EntityReferenceComponent implements OnInit {

  @Input()
  entity: WorldEntity;

  constructor() { }

  ngOnInit() {
  }

}
