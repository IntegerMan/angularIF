import {Story} from '../../engine/entities/story';
import {StoryData} from '../../engine/story-data/story-data';
import {LoggingService} from '../../utility/logging.service';
import {StoryLoader} from '../../engine/story-data/story-loader';

export class FogTerrierStory extends Story {

  reset(): void {

    // Grab our YAML resource data and stick it into JSON
    LoggingService.instance.debug(`Loading story file for ${this.constructor.name}...`);
    const data: StoryData = <StoryData> require('json-loader!yaml-loader!App/Content/Fog-Terrier/FogTerrier.yml');
    const loader = new StoryLoader(data);

    // Read metadata from the story data file
    loader.loadIntoStory(this);
  }

}
