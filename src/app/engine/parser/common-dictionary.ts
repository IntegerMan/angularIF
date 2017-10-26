import {LexiconService} from './lexicon.service';
import {DictionaryReader} from './dictionary-reader';
import {LexiconDictionary} from './lexicon-dictionary';

export class CommonDictionary extends LexiconDictionary {

  constructor(lexer: LexiconService) {
    super(lexer);

  }

  public addTerms(): void {

    console.log('Parsing YAML');
    const data = require('json-loader!yaml-loader!App/Content/CommonDict.yml');
    console.log(data);

    // Output the source file
    DictionaryReader.readDictionary(data, this.lexer);

  }

}
