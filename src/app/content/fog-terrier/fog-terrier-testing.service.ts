import {Injectable} from '@angular/core';
import {StoryTestingServiceBase} from '../../testing/story-testing-service-base';
import {UserInputService} from '../../engine/user-input.service';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {FogTerrierStory} from './fog-terrier-story';

@Injectable()
export class FogTerrierTestingService extends StoryTestingServiceBase {

  constructor(ifService: InteractiveFictionService,
              inputService: UserInputService) {

    super(ifService, inputService);

    super.initialize(new FogTerrierStory());

  }

}
