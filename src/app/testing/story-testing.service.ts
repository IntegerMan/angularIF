import { Injectable } from '@angular/core';
import {StoryTestingServiceBase} from './story-testing-service-base';
import {UserInputService} from '../engine/user-input.service';
import {InteractiveFictionService} from '../engine/interactive-fiction.service';

@Injectable()
export class StoryTestingService extends StoryTestingServiceBase {

  constructor(ifService: InteractiveFictionService,
              inputService: UserInputService) {
    super(ifService, inputService);

  }
}
