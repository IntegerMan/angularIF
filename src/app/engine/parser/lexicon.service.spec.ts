import { TestBed, inject } from '@angular/core/testing';

import { LexiconService } from './lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {NaturalLanguageService} from './natural-language.service';
import {EngineModule} from '../engine.module';
import {CommonDictionary} from './common-dictionary';

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

  it('should have replacement rules', inject([LexiconService], (service: LexiconService) => {
    service.useDefaults();
    expect(service.replacementRuleCount).toBeGreaterThan(0);
  }));

  it('cannot evaluates to can not', inject([LexiconService], (service: LexiconService) => {
    service.useDefaults();
    expect(service.replaceWords('cannot')).toBe('can not');
  }));

  it('north east evaluates to northeast', inject([LexiconService], (service: LexiconService) => {
    service.useDefaults();
    expect(service.replaceWords('north east')).toBe('northeast');
  }));
});
