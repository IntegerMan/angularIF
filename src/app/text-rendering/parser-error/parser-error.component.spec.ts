import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserErrorComponent } from './parser-error.component';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {GoogleAnalyticsService} from '../../utility/google-analytics.service';
import {ConfirmationService} from 'primeng/primeng';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {LoggingService} from '../../utility/logging.service';
import {StoryHostModule} from '../../story-host/story-host.module';
import {EngineModule} from '../../engine/engine.module';

describe('ParserErrorComponent', () => {
  let component: ParserErrorComponent;
  let fixture: ComponentFixture<ParserErrorComponent>;

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
    fixture = TestBed.createComponent(ParserErrorComponent);
    component = fixture.componentInstance;
    component.text = 'Dude, this failed';
    component.hint = 'Sucks to be you, bro.';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
