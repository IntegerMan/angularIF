import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {CloakStory} from './cloak-story';
import {StoryHostModule} from '../../story-host/story-host.module';
import {EngineModule} from '../../engine/engine.module';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {GoogleAnalyticsService} from '../../utility/google-analytics.service';

describe('CloakStory', () => {

  let story: CloakStory;
  let ifService: InteractiveFictionService;

  beforeEach(() =>  {
    TestBed.configureTestingModule({
      imports: [ StoryHostModule, EngineModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, InteractiveFictionService, GoogleAnalyticsService]
    })
      .compileComponents();

  });

  beforeEach(async(inject([InteractiveFictionService], (service: InteractiveFictionService) => {
    story = new CloakStory();
    ifService = service;
    ifService.initialize(story);
  })));

  it('should create', () => {
    expect(story).toBeTruthy();
  });

  it('should have a title of cloak of darkness', () => {
    expect(ifService.story.name).toBe('Cloak of Darkness');
  });

  it('should have a max score of 2', () => {
    expect(ifService.maxScore).toBe(2);
  });

  it('should have a start score of 0', () => {
    expect(ifService.currentScore).toBe(0);
  });

});
