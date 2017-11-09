import { Injectable } from '@angular/core';
import { Story } from '../engine/entities/story';
import { FogTerrierStory } from '../content/fog-terrier/fog-terrier-story';
import { CloakStory } from '../content/cloak-of-darkness/cloak-story';
import { StoryData } from '../engine/story-data/story-data';

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

  public getStoryData(key: string): StoryData {

    const story = this.getStory(key);

    if (!story) {
      return null;
    }

    return story.storyData;
  }

  public getStories(): Story[] {
    return this.stories;
  }

  buildEmptyStoryData(): StoryData {
    const data = new StoryData();
    data.name = 'Untitled';
    data.authors = 'Unattributed';
    data.version = '0.1';

    return data;
  }
}
