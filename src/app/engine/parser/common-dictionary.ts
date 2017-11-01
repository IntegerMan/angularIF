import {DictionaryReader} from './dictionary-reader';
import {LexiconDictionary} from './lexicon-dictionary';

export class CommonDictionary extends LexiconDictionary {

  public addTerms(): void {

    const data = require('json-loader!yaml-loader!App/Content/CommonDict.yml');
    DictionaryReader.readDictionary(data);

  }

}
