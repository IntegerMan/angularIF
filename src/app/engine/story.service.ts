import { Injectable } from '@angular/core';
import {Story} from './entities/story';
import {FogTerrierStory} from '../content/fog-terrier/fog-terrier-story';
import {CloakStory} from '../content/cloak-of-darkness/cloak-story';

@Injectable()
export class StoryService {

  constructor() {

  }

  public getStories(): Story[] {

    const stories: Story[] = [];

    // TODO: A dynamic load would be nice as well
    stories.push(new FogTerrierStory());
    stories.push(new CloakStory());

    // Ensure we have workable data
    for (const story of stories) {
      story.initialize();
    }

    return stories;

  }

}
