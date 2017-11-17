import { TestBed, inject } from '@angular/core/testing';

import { SentenceParserService } from './sentence-parser.service';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from './lexicon.service';
import {EngineModule} from '../engine.module';
import {NaturalLanguageService} from './natural-language.service';

describe('SentenceParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ EngineModule ],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    });
  });

  it('should be created', inject([SentenceParserService], (service: SentenceParserService) => {
    expect(service).toBeTruthy();
  }));
});
