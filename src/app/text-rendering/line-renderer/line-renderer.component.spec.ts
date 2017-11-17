import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRendererComponent } from './line-renderer.component';
import {InteractiveFictionService} from "../../engine/interactive-fiction.service";
import {GoogleAnalyticsService} from "../../utility/google-analytics.service";
import {LoggingService} from "../../utility/logging.service";
import {LexiconService} from "../../engine/parser/lexicon.service";
import {NaturalLanguageService} from "../../engine/parser/natural-language.service";
import {ConfirmationService} from "../../../assets/primeng/components/common/confirmationservice";
import {StoryHostModule} from "../../story-host/story-host.module";
import {EngineModule} from "../../engine/engine.module";
import {TextLine} from "../text-line";
import {RenderType} from "../render-type.enum";

describe('LineRendererComponent', () => {
  let component: LineRendererComponent;
  let fixture: ComponentFixture<LineRendererComponent>;

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
    fixture = TestBed.createComponent(LineRendererComponent);
    component = fixture.componentInstance;
    component.line = new TextLine('Test', RenderType.helpText, 'This is just help text');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
