import {LexiconService} from './lexicon.service';
import {LexiconDictionary} from './lexicon-dictionary';
import {Injectable} from '@angular/core';
import {TokenClassification} from './token-classification.enum';

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
    this.lexer.add('Adjective', ['My', 'Brass', 'Bronze', 'Decorated', 'Glittering', 'Scrawled', 'Unholy']);

    // Give directions a custom verb
    this.lexer.add('Direction',
      ['North', 'East', 'West', 'South', 'Up', 'Down', 'Northwest', 'Northeast', 'Southwest', 'Southeast']);

    // Register fallbacks for things that are verbs which can also be other terms
    this.lexer.addFallback('open', TokenClassification.Adjective);
    this.lexer.addFallback('using', TokenClassification.Preposition);

    // Handle some junk words
    this.lexer.addIgnorable('Please');

  }

}
