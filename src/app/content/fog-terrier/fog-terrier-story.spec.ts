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

describe('FogTerrier', () => {

  let story: FogTerrierStory;
  let ifService: InteractiveFictionService;
  let input: UserInputService;
  let output: TextOutputService;
  let context: CommandContext;

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
  })));

  it('should create', () => {
    expect(story).toBeTruthy();
  });

  it('should have a title of November Project', () => {
    expect(ifService.story.name).toBe('November Project');
  });

  it('should have a max score of 100', () => {
    expect(ifService.maxScore).toBe(100);
  });

  it('should start underway', () => {
    expect(ifService.gameState).toBe(GameState.underway);
  });

  it('should have a start score of 0', () => {
    expect(ifService.currentScore).toBe(0);
  });

  it('should start in the office', () => {
    expect(context.currentRoom.key).toBe('office');
  });

});
