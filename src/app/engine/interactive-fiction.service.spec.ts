import { TestBed, inject } from '@angular/core/testing';

import { InteractiveFictionService } from './interactive-fiction.service';
import {EngineModule} from './engine.module';
import {LoggingService} from '../utility/logging.service';
import {LexiconService} from './parser/lexicon.service';
import {NaturalLanguageService} from './parser/natural-language.service';
import {ConfirmationService} from 'primeng/primeng';
import {CommonUIModule} from '../common-ui/common-ui.module';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';

describe('InteractiveFictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EngineModule, CommonUIModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, ConfirmationService, GoogleAnalyticsService]
  });
  });

  it('should be created', inject([InteractiveFictionService], (service: InteractiveFictionService) => {
    expect(service).toBeTruthy();
  }));
});
