import { Injectable } from '@angular/core';
import {UserInputService} from '../../engine/user-input.service';
import {TextOutputService} from '../../engine/text-output.service';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {StoryTestingServiceBase} from '../../testing/story-testing-service-base';
import {CloakStory} from './cloak-story';

@Injectable()
export class CloakTestingService extends StoryTestingServiceBase {

  constructor(ifService: InteractiveFictionService,
              inputService: UserInputService,
              outputService: TextOutputService) {

    super(ifService, inputService, outputService);

    super.initialize(new CloakStory());

  }

}
