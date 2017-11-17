import { TestBed, inject } from '@angular/core/testing';

import { TokenizerService } from './tokenizer.service';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from './lexicon.service';
import {EngineModule} from '../engine.module';
import {NaturalLanguageService} from './natural-language.service';

describe('TokenizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ EngineModule ],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    });
  });

  it('should be created', inject([TokenizerService], (service: TokenizerService) => {
    expect(service).toBeTruthy();
  }));
});
