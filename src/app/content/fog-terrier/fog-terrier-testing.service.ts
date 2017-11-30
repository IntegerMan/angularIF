import {Injectable} from '@angular/core';
import {StoryTestingServiceBase} from '../../testing/story-testing-service-base';
import {FogTerrierStory} from './fog-terrier-story';
import {InteractiveFictionEngine} from '../../engine/interactive-fiction-engine';

@Injectable()
export class FogTerrierTestingService extends StoryTestingServiceBase {

  constructor(engine: InteractiveFictionEngine) {

    super(engine);

    super.initialize(new FogTerrierStory(engine.nlp));

  }

}
