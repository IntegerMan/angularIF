import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStateHeaderComponent } from './game-state-header.component';
import {LoggingService} from '../utility/logging.service';
import {ConfirmationService} from 'primeng/primeng';
import {StoryHostModule} from './story-host.module';
import {LexiconService} from '../engine/parser/lexicon.service';
import {EngineModule} from '../engine/engine.module';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {NaturalLanguageService} from '../engine/parser/natural-language.service';
import {InteractiveFictionService} from "../engine/interactive-fiction.service";

describe('GameStateHeaderComponent', () => {
  let component: GameStateHeaderComponent;
  let fixture: ComponentFixture<GameStateHeaderComponent>;

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
    fixture = TestBed.createComponent(GameStateHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
