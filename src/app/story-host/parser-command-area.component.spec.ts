import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserCommandAreaComponent } from './parser-command-area.component';
import {LoggingService} from '../utility/logging.service';
import {ConfirmationService} from 'primeng/primeng';
import {StoryHostModule} from './story-host.module';
import {LexiconService} from '../engine/parser/lexicon.service';
import {EngineModule} from '../engine/engine.module';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {NaturalLanguageService} from '../engine/parser/natural-language.service';

describe('ParserCommandAreaComponent', () => {
  let component: ParserCommandAreaComponent;
  let fixture: ComponentFixture<ParserCommandAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoryHostModule, EngineModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, ConfirmationService, GoogleAnalyticsService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserCommandAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
