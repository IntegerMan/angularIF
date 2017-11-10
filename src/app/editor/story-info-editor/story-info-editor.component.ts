import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {StoryData} from '../../engine/story-data/story-data';

@Component({
  selector: 'if-story-info-editor',
  templateUrl: './story-info-editor.component.html',
  styleUrls: ['./story-info-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StoryInfoEditorComponent implements OnInit {

  @Input()
  story: StoryData;

  constructor() {

  }

  ngOnInit() {
  }

}
