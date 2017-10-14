import {LexiconService} from './lexicon.service';

export abstract class LexiconDictionary {

  constructor(protected lexer: LexiconService) {

  }

  public abstract addTerms(): void;

}
