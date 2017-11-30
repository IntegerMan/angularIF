import {Injectable} from '@angular/core';
import {StoryTestingServiceBase} from '../../testing/story-testing-service-base';
import {CloakStory} from './cloak-story';
import {InteractiveFictionEngine} from '../../engine/interactive-fiction-engine';

@Injectable()
export class CloakTestingService extends StoryTestingServiceBase {

  constructor(engine: InteractiveFictionEngine) {

    super(engine);

    super.initialize(new CloakStory(engine.nlp));

  }

}
