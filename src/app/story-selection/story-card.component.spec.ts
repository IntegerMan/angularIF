import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryCardComponent } from './story-card.component';
import {LoggingService} from '../utility/logging.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmationService} from 'primeng/primeng';
import {StoryService} from '../services/story.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LexiconService} from '../engine/parser/lexicon.service';
import {EngineModule} from '../engine/engine.module';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {NaturalLanguageService} from '../engine/parser/natural-language.service';
import {StorySelectionModule} from './story-selection.module';
import {CloakStory} from '../content/cloak-of-darkness/cloak-story';
import {NaturalLanguageProcessor} from '../engine/parser/natural-language-processor';

describe('StoryCardComponent', () => {
  let component: StoryCardComponent;
  let fixture: ComponentFixture<StoryCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StorySelectionModule, EngineModule, RouterTestingModule, NoopAnimationsModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, ConfirmationService, GoogleAnalyticsService, StoryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryCardComponent);
    component = fixture.componentInstance;
    component.story = new CloakStory(new NaturalLanguageProcessor());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
