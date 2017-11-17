import { TestBed, inject } from '@angular/core/testing';

import { UserInputService } from './user-input.service';
import {EngineModule} from './engine.module';
import {CommonUIModule} from '../common-ui/common-ui.module';
import {LoggingService} from '../utility/logging.service';
import {ConfirmationService} from 'primeng/primeng';
import {LexiconService} from './parser/lexicon.service';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {NaturalLanguageService} from './parser/natural-language.service';

describe('UserInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EngineModule, CommonUIModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, ConfirmationService, GoogleAnalyticsService]
    });
  });

  it('should be created', inject([UserInputService], (service: UserInputService) => {
    expect(service).toBeTruthy();
  }));
});
