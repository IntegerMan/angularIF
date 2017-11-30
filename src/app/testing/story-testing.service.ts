import { Injectable } from '@angular/core';
import {StoryTestingServiceBase} from './story-testing-service-base';
import {InteractiveFictionEngine} from '../engine/interactive-fiction-engine';

@Injectable()
export class StoryTestingService extends StoryTestingServiceBase {

  constructor(engine: InteractiveFictionEngine) {
    super(engine);

  }
}
