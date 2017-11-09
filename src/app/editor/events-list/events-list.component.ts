import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';

@Component({
  selector: 'if-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventsListComponent implements OnInit {

  @Input()
  entity: EntityData;

  constructor() { }

  ngOnInit() {
  }

}
