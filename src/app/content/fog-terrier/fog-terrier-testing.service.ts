import { Injectable } from '@angular/core';
import {StoryTestingServiceBase} from '../../testing/story-testing-service-base';
import {UserInputService} from '../../engine/user-input.service';
import {TextOutputService} from '../../engine/text-output.service';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {FogTerrierStory} from './fog-terrier-story';
import {CommandResult} from '../../engine/command-result';
import {WorldEntity} from '../../engine/entities/world-entity';
import {isNullOrUndefined} from 'util';

@Injectable()
export class FogTerrierTestingService extends StoryTestingServiceBase {

  constructor(ifService: InteractiveFictionService,
              inputService: UserInputService,
              outputService: TextOutputService) {

    super(ifService, inputService, outputService);

    super.initialize(new FogTerrierStory());

  }

  getEntityFromResult(result: CommandResult, key: string = null): WorldEntity {
    const tokens = result.command.objects.filter(o => o.entity &&  (isNullOrUndefined(key) || o.entity.key === key));
    if (tokens && tokens.length > 0)  {
      return tokens[0].entity;
    }

    return null;
  }

  lookForEntity(description: string, key: string = null): WorldEntity {
    const result = this.input(`x ${description}`);
    return this.getEntityFromResult(result, key);
  }
}
