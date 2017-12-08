import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'if-entity-section-header',
  templateUrl: './entity-section-header.component.html',
  styleUrls: ['./entity-section-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntitySectionHeaderComponent implements OnInit {

  @Input()
  name: string;

  @Input()
  canAdd: boolean = false;

  @Output()
  addClicked: EventEmitter<void>;

  constructor() {
    this.addClicked = new EventEmitter<void>();
  }

  ngOnInit(): void {
  }

  onAddClicked(): void {
    console.debug(`Add Clicked. Emitting now`);
    this.addClicked.emit();
  }
}
