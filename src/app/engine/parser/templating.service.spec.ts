import { TestBed, inject } from '@angular/core/testing';

import { TemplatingService } from './templating.service';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from './lexicon.service';
import {EngineModule} from '../engine.module';
import {NaturalLanguageService} from './natural-language.service';
import {CommonUIModule} from '../../common-ui/common-ui.module';
import {ConfirmationService} from 'primeng/primeng';
import {GoogleAnalyticsService} from '../../utility/google-analytics.service';

describe('TemplatingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EngineModule, CommonUIModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, ConfirmationService, GoogleAnalyticsService]
    });
  });

  it('should be created', inject([TemplatingService], (service: TemplatingService) => {
    expect(service).toBeTruthy();
  }));
});
