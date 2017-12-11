import { LexiconService } from './lexicon.service';
import {NaturalLanguageService} from './natural-language.service';
import {CommandToken} from './command-token';
import {CommonDictionary} from './common-dictionary';

describe('LexiconService', () => {

  beforeEach(() => {

    // Ensure common dictionary terms are added
    const dict = new CommonDictionary();
    dict.addTerms();

  });

  it('should be created',  () => {
    expect(LexiconService.instance).toBeTruthy();
  });

  it('should have replacement rules',  () => {
    expect(LexiconService.instance.replacementRuleCount).toBeGreaterThan(0);
  });

  it('should have expansion rules',  () => {
    expect(LexiconService.instance.expansionRuleCount).toBeGreaterThan(0);
  });

  it('ne evaluates to northeast',  () => {
    const token: CommandToken = NaturalLanguageService.instance.processor.getTokenForWord('ne');
    expect(LexiconService.instance.replaceTokens([token], NaturalLanguageService.instance.processor)[0].name).toBe('northeast');
  });

  it('cannot evaluates to can not',  () => {
    expect(LexiconService.instance.replaceWords('cannot')).toBe('can not');
  });

  it('north east evaluates to northeast',  () => {
    expect(LexiconService.instance.replaceWords('north east')).toBe('northeast');
  });
});
