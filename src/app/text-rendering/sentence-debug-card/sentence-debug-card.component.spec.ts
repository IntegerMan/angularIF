import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceDebugCardComponent } from './sentence-debug-card.component';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {GoogleAnalyticsService} from '../../utility/google-analytics.service';
import {ConfirmationService} from 'primeng/primeng';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {EngineModule} from '../../engine/engine.module';
import {StoryHostModule} from '../../story-host/story-host.module';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';

describe('SentenceDebugCardComponent', () => {
  let component: SentenceDebugCardComponent;
  let fixture: ComponentFixture<SentenceDebugCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoryHostModule, EngineModule],
      providers: [
        NaturalLanguageService,
        LexiconService,
        LoggingService,
        ConfirmationService,
        GoogleAnalyticsService,
        InteractiveFictionService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentenceDebugCardComponent);
    component = fixture.componentInstance;
    component.command = TestDataProvider.buildCommand();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
