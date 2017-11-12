import { EditorService } from '../editor.service';
import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ActorData} from '../../engine/story-data/actor-data';
import {StoryData} from '../../engine/story-data/story-data';

@Component({
  selector: 'if-actor-editor',
  templateUrl: './actor-editor.component.html',
  styleUrls: ['./actor-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ActorEditorComponent implements OnInit {

  @Input()
  story: StoryData;

  @Input()
  actor: ActorData;

  selectedTab: number = 0;

  constructor(private editorService: EditorService) { 

  }

  ngOnInit() {
    $('ul.tabs').tabs();
  }

  addObject(): void {
    this.editorService.addObject();
  }

  selectTab(number: number) {
    this.selectedTab = number;
  }
}
