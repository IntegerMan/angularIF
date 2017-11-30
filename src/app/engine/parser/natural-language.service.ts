import { Injectable } from '@angular/core';
import {LexiconService} from './lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {LanguageTerm} from './language-term';
import {TokenClassification} from './token-classification.enum';
import {isNullOrUndefined} from 'util';
import {CommandToken} from './command-token';
import {StringHelper} from '../../utility/string-helper';
import {NaturalLanguageProcessor} from './natural-language-processor';

@Injectable()
export class NaturalLanguageService {

  private static _instance: NaturalLanguageService;

  static get instance(): NaturalLanguageService {
    if (!this._instance) {
      this._instance = new NaturalLanguageService();
    }
    return this._instance;
  }

  private _processor: NaturalLanguageProcessor;

  constructor() {
    this._processor = new NaturalLanguageProcessor();
  }

  get processor(): NaturalLanguageProcessor {
    return this._processor;
  }
}
