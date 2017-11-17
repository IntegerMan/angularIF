import { TestBed, inject } from '@angular/core/testing';

import { CommandEntryService } from './command-entry.service';
import {LoggingService} from '../utility/logging.service';
import {ConfirmationService} from 'primeng/primeng';
import {StoryHostModule} from './story-host.module';
import {LexiconService} from '../engine/parser/lexicon.service';
import {EngineModule} from '../engine/engine.module';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {NaturalLanguageService} from '../engine/parser/natural-language.service';

describe('CommandEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoryHostModule, EngineModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService, ConfirmationService, GoogleAnalyticsService]
    });
  });

  it('should be created', inject([CommandEntryService], (service: CommandEntryService) => {
    expect(service).toBeTruthy();
  }));
});
