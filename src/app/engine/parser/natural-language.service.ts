import { Injectable } from '@angular/core';
import {LexiconService} from './lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {LanguageTerm} from './language-term';

@Injectable()
export class NaturalLanguageService {

  private static _instance: NaturalLanguageService;

  static get instance(): NaturalLanguageService {
    if (!this._instance) {
      this._instance = new NaturalLanguageService(LexiconService.instance, LoggingService.instance);
    }
    return this._instance;
  }

  private nlp: any;

  constructor(private lexer: LexiconService,
              private logger: LoggingService) {

    this.nlp = require('Compromise');

    NaturalLanguageService._instance = this;
  }

  public isTerm(word: string, tagToMatch: string) {
    const term: LanguageTerm = this.getTerm(word);

    return term.tags.filter(t => t === tagToMatch).length > 0;
  }

  public getTerm(word: string): LanguageTerm {
    const terms: LanguageTerm[] = this.getTerms(word);

    if (terms && terms.length > 0) {
      return terms[0];
    }

    return null;
  }

  public getTerms(sentence: string): LanguageTerm[] {

    this.logger.log(`Language service is extracting terms from: ${sentence}`);

    const data: LanguageTerm[] = this.nlp(sentence, this.lexer.lexicon).terms().data();
    this.logger.log(data);

    return data;
  }

  getNouns(phrase: string): string[] {

    const matches: string[] = [];

    const terms: LanguageTerm[] = this.getTerms(phrase);
    for (const term of terms.filter(t => t.bestTag === 'Noun')) {
      matches.push(term.text);
    }

    return matches;
  }

  getAdjectives(phrase: string): string[] {

    const matches: string[] = [];

    const terms: LanguageTerm[] = this.getTerms(phrase);
    for (const term of terms.filter(t => t.bestTag === 'Adjective')) {
      matches.push(term.text);
    }

    return matches;
  }

}
