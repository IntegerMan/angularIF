import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOverComponent } from './game-over.component';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {GoogleAnalyticsService} from '../../utility/google-analytics.service';
import {EngineModule} from '../../engine/engine.module';
import {StoryHostModule} from '../../story-host/story-host.module';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {ConfirmationService} from 'primeng/components/common/confirmationservice';
import {LoggingService} from '../../utility/logging.service';

describe('GameOverComponent', () => {
  let component: GameOverComponent;
  let fixture: ComponentFixture<GameOverComponent>;

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
    fixture = TestBed.createComponent(GameOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
