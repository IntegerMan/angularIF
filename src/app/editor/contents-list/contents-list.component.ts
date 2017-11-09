import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';

@Component({
  selector: 'if-contents-list',
  templateUrl: './contents-list.component.html',
  styleUrls: ['./contents-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ContentsListComponent implements OnInit {

  @Input()
  entity: EntityData;

  constructor() { }

  ngOnInit() {
  }

}
