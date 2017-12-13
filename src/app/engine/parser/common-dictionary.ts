import {DictionaryReader} from './dictionary-reader';
import {LexiconDictionary} from './lexicon-dictionary';

export class CommonDictionary extends LexiconDictionary {

  public addTerms(): void {

    const data = require('json-loader!App/Content/CommonDict.json');
    DictionaryReader.readDictionary(data);

  }

}
