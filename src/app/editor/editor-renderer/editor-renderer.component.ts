import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {StoryData} from '../../engine/story-data/story-data';

@Component({
  selector: 'if-editor-renderer',
  templateUrl: './editor-renderer.component.html',
  styleUrls: ['./editor-renderer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorRendererComponent implements OnInit {

  @Input()
  story: StoryData;

  @Input()
  node: any;

  constructor() { }

  ngOnInit() {
  }

}
