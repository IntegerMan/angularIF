import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {StoryData} from '../../engine/story-data/story-data';

@Component({
  selector: 'if-editor-import',
  templateUrl: './editor-import.component.html',
  styleUrls: ['./editor-import.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorImportComponent implements OnInit {

  @Output()
  imported: EventEmitter<StoryData>;

  @Output()
  cancelled: EventEmitter<void>;

  public data: string = '';

  constructor() {

    this.imported = new EventEmitter<StoryData>();
    this.cancelled = new EventEmitter<void>();

  }

  ngOnInit() {
  }

  onImport() {
    const story: StoryData = JSON.parse(this.data);
    if (story) {
      this.imported.emit(story);
    }
  }

  onCancel() {
    this.cancelled.emit(null);
  }
}
