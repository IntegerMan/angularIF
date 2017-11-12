import {Story} from '../../engine/entities/story';
import {StoryData} from '../../engine/story-data/story-data';
import {LoggingService} from '../../utility/logging.service';
import {StoryLoader} from '../../engine/story-data/story-loader';

export class FogTerrierStory extends Story {

  constructor() {
    super('Fog');
  }

  reset(): void {

    // Grab our YAML resource data and stick it into JSON
    if (this.storyData === null || !this.storyData) {

      LoggingService.instance.debug(`Loading story file for ${this.constructor.name}...`);
      this.storyData = <StoryData> require('json-loader!App/Content/Fog-Terrier/FogTerrier.json');

    }

    const loader = new StoryLoader(this.storyData);

    // Read metadata from the story data file
    loader.loadIntoStory(this);
  }

}
