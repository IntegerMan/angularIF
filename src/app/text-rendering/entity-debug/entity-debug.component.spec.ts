import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDebugComponent } from './entity-debug.component';
import {LoggingService} from '../../utility/logging.service';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmationService} from 'primeng/primeng';
import {StoryHostModule} from '../../story-host/story-host.module';
import {StoryService} from '../../services/story.service';
import {RouterTestingModule} from '@angular/router/testing';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EngineModule} from '../../engine/engine.module';
import {GoogleAnalyticsService} from '../../utility/google-analytics.service';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';

describe('EntityDebugComponent', () => {
  let component: EntityDebugComponent;
  let fixture: ComponentFixture<EntityDebugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoryHostModule, EngineModule, RouterTestingModule, NoopAnimationsModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, ConfirmationService, GoogleAnalyticsService, StoryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDebugComponent);
    component = fixture.componentInstance;
    component.entity = TestDataProvider.buildGameRoom();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
