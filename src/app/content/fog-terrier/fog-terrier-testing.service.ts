import { Injectable } from '@angular/core';
import {StoryTestingServiceBase} from '../../testing/story-testing-service-base';
import {UserInputService} from '../../engine/user-input.service';
import {TextOutputService} from '../../engine/text-output.service';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {FogTerrierStory} from './fog-terrier-story';

@Injectable()
export class FogTerrierTestingService extends StoryTestingServiceBase {

  constructor(ifService: InteractiveFictionService,
              inputService: UserInputService,
              outputService: TextOutputService) {

    super(ifService, inputService, outputService);

    super.initialize(new FogTerrierStory());

  }

}
