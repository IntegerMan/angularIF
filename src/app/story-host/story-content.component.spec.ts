import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoryContentComponent } from './story-content.component';
import {LoggingService} from '../utility/logging.service';
import {ConfirmationService} from 'primeng/primeng';
import {StoryHostModule} from './story-host.module';
import {LexiconService} from '../engine/parser/lexicon.service';
import {EngineModule} from '../engine/engine.module';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {NaturalLanguageService} from '../engine/parser/natural-language.service';
import {RouterTestingModule} from '@angular/router/testing';
import {CloakStory} from '../content/cloak-of-darkness/cloak-story';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('StoryContentComponent', () => {
  let component: StoryContentComponent;
  let fixture: ComponentFixture<StoryContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoryHostModule, EngineModule, RouterTestingModule, NoopAnimationsModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, ConfirmationService, GoogleAnalyticsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryContentComponent);
    component = fixture.componentInstance;
    component.story = new CloakStory();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
