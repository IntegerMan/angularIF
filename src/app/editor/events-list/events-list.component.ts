import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {EntityData} from '../../engine/story-data/entity-data';
import {KeyValuePair} from '../../utility/key-value-pair';
import {RoomData} from '../../engine/story-data/room-data';
import {EditorService} from '../editor.service';

@Component({
  selector: 'if-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventsListComponent implements OnInit, OnChanges {

  @Input()
  entity: any;
  kvps: KeyValuePair[];

  constructor(private editorService: EditorService) {
    this.kvps = [];
  }

  ngOnInit() {
    this.updateData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateData();
  }

  onAddClicked(): void {
    this.editorService.addEvent();
  }

  private updateData() {
    this.kvps.length = 0;
    if (this.entity && this.entity.events) {
      for (const key of Object.getOwnPropertyNames(this.entity.events)) {
        const kvp = new KeyValuePair(key, this.entity.events[key]);
        this.kvps.push(kvp);
      }
    }
  }

}
