import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorySelectionComponent } from './story-selection.component';
import {LoggingService} from '../utility/logging.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmationService} from 'primeng/primeng';
import {StoryService} from '../services/story.service';
import {RouterTestingModule} from '@angular/router/testing';
import {StorySelectionModule} from './story-selection.module';
import {LexiconService} from '../engine/parser/lexicon.service';
import {EngineModule} from '../engine/engine.module';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {NaturalLanguageService} from '../engine/parser/natural-language.service';

describe('StorySelectionComponent', () => {
  let component: StorySelectionComponent;
  let fixture: ComponentFixture<StorySelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StorySelectionModule, EngineModule, RouterTestingModule, NoopAnimationsModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, ConfirmationService, GoogleAnalyticsService, StoryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
