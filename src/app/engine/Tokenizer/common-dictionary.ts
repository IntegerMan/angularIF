import {LexiconService} from './lexicon.service';
import {LexiconDictionary} from './lexicon-dictionary';
import {Injectable} from '@angular/core';

@Injectable()
export class CommonDictionary extends LexiconDictionary {

  constructor(lexer: LexiconService) {
    super(lexer);

  }

  public addTerms(): void {

    this.lexer.addVerb('Open');
    this.lexer.addAdjective('Bronze');

  }
}
