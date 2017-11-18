import { TestBed, inject } from '@angular/core/testing';

import { LexiconService } from './lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {NaturalLanguageService} from './natural-language.service';
import {EngineModule} from '../engine.module';
import {CommonDictionary} from './common-dictionary';
import {CommandToken} from './command-token';
import {LanguageTerm} from './language-term';
import {TokenizerService} from './tokenizer.service';

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

  it('should have expansion rules', inject([LexiconService], (service: LexiconService) => {
    service.useDefaults();
    expect(service.expansionRuleCount).toBeGreaterThan(0);
  }));

  it('ne evaluates to northeast', inject([LexiconService, TokenizerService], (service: LexiconService, tokenizer: TokenizerService) => {
    service.useDefaults();
    const token: CommandToken = tokenizer.getTokenForWord('ne');
    expect(service.replaceTokens([token], tokenizer)[0].name).toBe('northeast');
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
