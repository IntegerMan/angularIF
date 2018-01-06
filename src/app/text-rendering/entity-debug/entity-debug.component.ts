import {Component, Input, OnInit} from '@angular/core';
import {WorldEntity} from '../../engine/entities/world-entity';

@Component({
  selector: 'if-entity-debug',
  templateUrl: './entity-debug.component.html',
  styleUrls: ['./entity-debug.component.css']
})
export class EntityDebugComponent implements OnInit {

  @Input()
  entity: WorldEntity;

  constructor() {
  }

  ngOnInit(): void {
  }

}
