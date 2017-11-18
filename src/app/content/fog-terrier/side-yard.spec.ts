import {async, inject, TestBed} from '@angular/core/testing';

import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {StoryHostModule} from '../../story-host/story-host.module';
import {EngineModule} from '../../engine/engine.module';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {GoogleAnalyticsService} from '../../utility/google-analytics.service';
import {CommandContext} from '../../engine/command-context';
import {UserInputService} from '../../engine/user-input.service';
import {TextOutputService} from '../../engine/text-output.service';
import {GameState} from '../../engine/game-state.enum';
import {FogTerrierStory} from './fog-terrier-story';
import {Room} from '../../engine/entities/room';

describe('FogTerrier.YourHouse.Sideyard', () => {

  let story: FogTerrierStory;
  let ifService: InteractiveFictionService;
  let input: UserInputService;
  let output: TextOutputService;
  let context: CommandContext;
  let room: Room;

  beforeEach(() =>  {
    TestBed.configureTestingModule({
      imports: [ StoryHostModule, EngineModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, InteractiveFictionService, GoogleAnalyticsService]
    })
      .compileComponents();

  });

  beforeEach(async(inject([InteractiveFictionService, UserInputService, TextOutputService],
    (service: InteractiveFictionService, inputService: UserInputService, outputService: TextOutputService) => {

    story = new FogTerrierStory();
    ifService = service;
    input = inputService;
    output = outputService;

    ifService.initialize(story);
    context = ifService.buildCommandContext();
    room = story.findRoomByKey('sideyard');
  })));

  it('should contain', () => {
    expect(room).toBeTruthy();
  });

});
