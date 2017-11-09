import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';

@Component({
  selector: 'if-aliases-list',
  templateUrl: './aliases-list.component.html',
  styleUrls: ['./aliases-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AliasesListComponent implements OnInit {

  @Input()
  entity: EntityData;

  constructor() { }

  ngOnInit() {
  }

}
