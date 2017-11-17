import { TestBed, inject } from '@angular/core/testing';

import { LexiconService } from './lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {NaturalLanguageService} from './natural-language.service';
import {EngineModule} from '../engine.module';

describe('LexiconService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ EngineModule ],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    });
  });

  it('should be created', inject([LexiconService], (service: LexiconService) => {
    expect(service).toBeTruthy();
  }));
});
