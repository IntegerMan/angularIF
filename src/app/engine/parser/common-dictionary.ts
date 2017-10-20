import {LexiconService} from './lexicon.service';
import {LexiconDictionary} from './lexicon-dictionary';
import {Injectable} from '@angular/core';

@Injectable()
export class CommonDictionary extends LexiconDictionary {

  constructor(lexer: LexiconService) {
    super(lexer);

  }

  public addTerms(): void {

    // Identify some problem verbs
    this.lexer.addVerb('Open');
    this.lexer.addVerb('Procure');
    this.lexer.addVerb('Restart');
    this.lexer.addVerb('Reset');

    // Identify some problem nouns
    this.lexer.addNoun('Hall');
    this.lexer.addNoun('Chandelier');
    this.lexer.addNoun('Message');
    this.lexer.addNoun('Note');

    // Identify some problem adjectives
    this.lexer.addAdjective('Brass');
    this.lexer.addAdjective('Bronze');
    this.lexer.addAdjective('Decorated');
    this.lexer.addAdjective('Glittering');
    this.lexer.addAdjective('Scrawled');

    // Give directions a custom verb
    this.lexer.addDirection('North');
    this.lexer.addDirection('East');
    this.lexer.addDirection('West');
    this.lexer.addDirection('South');
    this.lexer.addDirection('Up');
    this.lexer.addDirection('Down');
    this.lexer.addDirection('Northwest');
    this.lexer.addDirection('Northeast');
    this.lexer.addDirection('Southwest');
    this.lexer.addDirection('Southeast');

    // Handle some junk words
    this.lexer.addIgnorable('Please');

  }
}
