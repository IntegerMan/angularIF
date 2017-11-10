import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {StoryData} from '../../engine/story-data/story-data';
import {ActorData} from '../../engine/story-data/actor-data';

@Component({
  selector: 'if-actor-list-editor',
  templateUrl: './actor-list-editor.component.html',
  styleUrls: ['./actor-list-editor.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ActorListEditorComponent implements OnInit {

  @Input()
  story: StoryData;

  constructor() { }

  ngOnInit() {
  }

  addActor(): void {

    const actorData = new ActorData();
    actorData.key = 'newActor';
    actorData.name = 'New Actor';

    this.story.actors.push(actorData);
  }
}
