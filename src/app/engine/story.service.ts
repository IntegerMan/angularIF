import { Injectable } from '@angular/core';
import {Story} from './entities/story';
import {FogTerrierStory} from '../content/fog-terrier/fog-terrier-story';
import {CloakStory} from '../content/cloak-of-darkness/cloak-story';

@Injectable()
export class StoryService {

  private stories: Story[] = [];

  constructor() {

    // TODO: A dynamic load would be nice as well
    this.stories.push(new FogTerrierStory());
    this.stories.push(new CloakStory());

    // Ensure we have workable data
    for (const story of this.stories) {
      story.initialize();
    }

  }

  public getStory(key: string): Story {

    if (!key) {
      return null;
    }

    for (const story of this.stories) {
      if (story.key === key) {
        return story;
      }
    }

    return null;
  }

  public getStories(): Story[] {
    return this.stories;
  }

  buildEmptyStory(): Story {
    return new Story('blank_story');
  }
}
