import {LexiconService} from './lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {StringHelper} from '../../utility/string-helper';

export abstract class DictionaryReader {

  public static readDictionary(source: any, lexer: LexiconService): void {

    LoggingService.instance.debug(`Reading dictionary ${source.name} by ${source.author.name}.`);

    // For each tag listed in terms, we're going to create a mapped entry for it and that tag
    if (source.terms) {
      for (const tag of Object.getOwnPropertyNames(source.terms)) {
        const terms: string[] = source.terms[tag];
        LoggingService.instance.debug(`Dictionary loaded tag ${tag} containing ${StringHelper.toOxfordCommaList(terms)}`);
        lexer.add(tag, terms);
      }
    }

    // Register fallbacks for things that are verbs which can also be other terms
    if (source.fallback) {
      for (const token of Object.getOwnPropertyNames(source.fallback)) {
        lexer.addFallback(token, source.fallback[token]);
      }
    }

  }

}
