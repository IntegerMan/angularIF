import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorHostComponent } from './editor-host.component';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {TextOutputService} from '../../engine/text-output.service';
import {RouterTestingModule} from '@angular/router/testing';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {EngineModule} from '../../engine/engine.module';
import {TemplatingService} from '../../engine/parser/templating.service';
import {GoogleAnalyticsService} from '../../utility/google-analytics.service';
import {StoryService} from '../../services/story.service';

describe('EditorHostComponent', () => {
  let component: EditorHostComponent;
  let fixture: ComponentFixture<EditorHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule, RouterTestingModule, EngineModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, TemplatingService, GoogleAnalyticsService, StoryService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
