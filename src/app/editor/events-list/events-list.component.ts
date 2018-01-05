import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {EditorService} from '../editor.service';
import {EventData} from '../../engine/story-data/event-data';

@Component({
  selector: 'if-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EventsListComponent implements OnInit, OnChanges {

  @Input()
  entity: any;
  events: EventData[];

  constructor(private editorService: EditorService) {
    this.events = [];
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
    this.events = this.entity.eventData;
  }

}
