import { Component, OnInit } from '@angular/core';
import {Story} from '../engine/entities/story';
import {FogTerrierStory} from '../content/fog-terrier/fog-terrier-story';
import {CloakStory} from '../content/cloak-of-darkness/cloak-story';

@Component({
  selector: 'if-story-selection',
  templateUrl: './story-selection.component.html',
  styleUrls: ['./story-selection.component.css']
})
export class StorySelectionComponent implements OnInit {

  // TODO: Probably should be working with StoryInfo objects here
  public stories: Story[] = [];

  constructor() {

    // TODO: A dynamic load would be nice as well
    this.stories.push(new FogTerrierStory());
    this.stories.push(new CloakStory());

    // Ensure we have workable data
    for (const story of this.stories) {
      story.initialize();
    }

  }

  ngOnInit(): void {

  }

}
