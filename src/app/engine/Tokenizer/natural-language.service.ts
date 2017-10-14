import { Injectable } from '@angular/core';
import {LexiconService} from './lexicon.service';
import {LoggingService} from '../../logging.service';

@Injectable()
export class NaturalLanguageService {

  private nlp: any;

  constructor(private lexer: LexiconService,
              private logger: LoggingService) {
    this.nlp = require('Compromise');

  }

  public getTerms(sentence: string): any[] {

    const nlpData = this.nlp(sentence, this.lexer.lexicon);

    const data: any[] = nlpData.terms().data();
    this.logger.log(data);

    return data;
  }
}
