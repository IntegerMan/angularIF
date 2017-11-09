import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {RoomData} from '../../engine/story-data/room-data';

@Component({
  selector: 'if-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationListComponent implements OnInit {

  @Input()
  room: RoomData;

  constructor() { }

  ngOnInit() {
  }

}
