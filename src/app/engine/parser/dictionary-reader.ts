import {LexiconService} from './lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {StringHelper} from '../../utility/string-helper';

export abstract class DictionaryReader {

  public static shouldLog: boolean = false;

  public static readDictionary(source: any): void {

    LoggingService.instance.debug(`Reading dictionary ${source.name} by ${source.author.name}.`);

    const lexer:  LexiconService = LexiconService.instance;

    // For each tag listed in terms, we're going to create a mapped entry for it and that tag
    if (source.terms) {
      for (const tag of Object.getOwnPropertyNames(source.terms)) {
        const terms: string[] = source.terms[tag];
        if (this.shouldLog) {
          LoggingService.instance.debug(`Dictionary loaded tag ${tag} containing ${StringHelper.toOxfordCommaList(terms)}`);
        }
        lexer.add(tag, terms);
      }
    }

    // Register fallbacks for things that are verbs which can also be other terms
    if (source.fallback) {
      for (const token of Object.getOwnPropertyNames(source.fallback)) {
        if (this.shouldLog) {
          LoggingService.instance.debug(`Dictionary loaded fallback ${token} of type ${source.fallback[token]}`);
        }
        lexer.addFallback(token, source.fallback[token]);
      }
    }

    // Register string replacement rules
    if (source.substitute) {
      for (const token of Object.getOwnPropertyNames(source.substitute)) {
        if (this.shouldLog) {
          LoggingService.instance.debug(`Dictionary loaded string replace rule: ${token} -> ${source.substitute[token]}`);
        }
        lexer.addReplacementRule(token, source.substitute[token]);
      }
    }

    // Register string expansion rules
    if (source.expand) {
      for (const token of Object.getOwnPropertyNames(source.expand)) {
        if (this.shouldLog) {
          LoggingService.instance.debug(`Dictionary loaded string expansion rule: ${token} -> ${source.expand[token]}`);
        }
        lexer.addExpansionRule(token, source.expand[token]);
      }
    }

  }

}
