import { TestBed, inject } from '@angular/core/testing';

import { NaturalLanguageService } from './natural-language.service';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from './lexicon.service';
import {EngineModule} from '../engine.module';

describe('NaturalLanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ EngineModule ],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    });
  });

  it('should be created', inject([NaturalLanguageService], (service: NaturalLanguageService) => {
    expect(service).toBeTruthy();
  }));
});
