import { Injectable } from '@angular/core';
import {LexiconService} from './lexicon.service';
import {LoggingService} from '../../logging.service';
import {LanguageTerm} from './language-term';

@Injectable()
export class NaturalLanguageService {

  private nlp: any;

  constructor(private lexer: LexiconService,
              private logger: LoggingService) {
    this.nlp = require('Compromise');

  }

  public getTerms(sentence: string): LanguageTerm[] {

    this.logger.log(`Language service is extracting terms from: ${sentence}`);

    const nlpData = this.nlp(sentence, this.lexer.lexicon);

    const data: LanguageTerm[] = nlpData.terms().data();
    this.logger.log(data);

    return data;
  }
}
