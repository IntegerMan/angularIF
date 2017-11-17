import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInputComponent } from './user-input.component';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {StoryHostModule} from '../../story-host/story-host.module';
import {EngineModule} from '../../engine/engine.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {ConfirmationService} from 'primeng/primeng';
import {GoogleAnalyticsService} from '../../utility/google-analytics.service';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('UserInputComponent', () => {
  let component: UserInputComponent;
  let fixture: ComponentFixture<UserInputComponent>;

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
    fixture = TestBed.createComponent(UserInputComponent);
    component = fixture.componentInstance;
    component.text = 'This is a test';
    component.command = TestDataProvider.buildCommand();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
