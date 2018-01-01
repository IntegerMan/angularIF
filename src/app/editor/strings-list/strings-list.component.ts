import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {StoryData} from '../../engine/story-data/story-data';
import {KeyValuePair} from '../../utility/key-value-pair';

@Component({
  selector: 'if-strings-list',
  templateUrl: './strings-list.component.html',
  styleUrls: ['./strings-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StringsListComponent implements OnInit, OnChanges {

  @Input()
  story: StoryData;

  strings: KeyValuePair[];

  constructor() {
    this.strings = [];
  }

  ngOnInit(): void {
    this.updateStrings();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateStrings();
  }

  private updateStrings(): void {
    this.strings.length = 0;

    if (this.story.strings) {
      for (const str of this.story.strings) {
        for (const key of Object.getOwnPropertyNames(str)) {
          const kvp = new KeyValuePair(key, str[key]);
          this.strings.push(kvp);
        }
      }
    }


  }
}
