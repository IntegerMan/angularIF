import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryHostComponent } from './story-host.component';
import {LoggingService} from '../utility/logging.service';
import {ConfirmationService} from 'primeng/primeng';
import {StoryHostModule} from './story-host.module';
import {LexiconService} from '../engine/parser/lexicon.service';
import {EngineModule} from '../engine/engine.module';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {NaturalLanguageService} from '../engine/parser/natural-language.service';
import {CloakStory} from '../content/cloak-of-darkness/cloak-story';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {StoryService} from '../services/story.service';
import {NaturalLanguageProcessor} from '../engine/parser/natural-language-processor';

describe('StoryHostComponent', () => {
  let component: StoryHostComponent;
  let fixture: ComponentFixture<StoryHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoryHostModule, EngineModule, RouterTestingModule, NoopAnimationsModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, ConfirmationService, GoogleAnalyticsService, StoryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryHostComponent);
    component = fixture.componentInstance;
    component.story = new CloakStory(new NaturalLanguageProcessor());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
