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
    this.lexer.add('Verb', ['Open', 'Procure', 'Restart', 'Reset', 'Inspect']);

    // Identify some problem nouns
    this.lexer.add('Noun', ['Hall', 'Chandelier', 'Message', 'Note']);

    // Identify some problem adjectives
    this.lexer.add('Adjective', ['Brass', 'Bronze', 'Decorated', 'Glittering', 'Scrawled', 'Unholy']);

    // Give directions a custom verb
    this.lexer.add('Direction',
      ['North', 'East', 'West', 'South', 'Up', 'Down', 'Northwest', 'Northeast', 'Southwest', 'Southeast']);

    // Handle some junk words
    this.lexer.addIgnorable('Please');

  }

}
