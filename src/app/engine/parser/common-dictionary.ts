import {LexiconService} from './lexicon.service';
import {DictionaryReader} from './dictionary-reader';
import {LexiconDictionary} from './lexicon-dictionary';
import * as data from '../../../content/CommonDict.json';

export class CommonDictionary extends LexiconDictionary {

  constructor(lexer: LexiconService) {
    super(lexer);

  }

  public addTerms(): void {

    // Output the source file
    DictionaryReader.readDictionary(data, this.lexer);

  }

}
