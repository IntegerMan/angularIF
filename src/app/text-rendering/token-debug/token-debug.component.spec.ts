import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenDebugComponent } from './token-debug.component';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {GoogleAnalyticsService} from '../../utility/google-analytics.service';
import {ConfirmationService} from 'primeng/primeng';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {StoryHostModule} from '../../story-host/story-host.module';
import {EngineModule} from '../../engine/engine.module';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('TokenDebugComponent', () => {
  let component: TokenDebugComponent;
  let fixture: ComponentFixture<TokenDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoryHostModule, EngineModule, NoopAnimationsModule],
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
    fixture = TestBed.createComponent(TokenDebugComponent);
    component = fixture.componentInstance;
    component.token = TestDataProvider.buildCommandToken();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
