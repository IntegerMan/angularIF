import { Injectable } from '@angular/core';
import {LexiconService} from './lexicon.service';
import {LoggingService} from '../../utility/logging.service';
import {LanguageTerm} from './language-term';
import {TokenClassification} from './token-classification.enum';
import {isNullOrUndefined} from 'util';
import {CommandToken} from './command-token';
import {StringHelper} from '../../utility/string-helper';

@Injectable()
export class NaturalLanguageService {

  private static _instance: NaturalLanguageService;

  shouldLog: boolean = false;

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

    if (this.shouldLog) {
      this.logger.log(`Language service is extracting terms from: ${sentence}`);
    }

    // Commas are death.
    sentence = StringHelper.replaceAll(sentence, ',', '');

    const data: LanguageTerm[] = this.nlp(sentence, this.lexer.lexicon).terms().data();

    if (this.shouldLog) {
      this.logger.log(data);
    }

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

  public static getTokenFromTerm(term): CommandToken {

    // If it was plural, we'll treat it as if it was singular
    if (term && term.tags && term.tags.indexOf('Plural') >= 0) {
      term.normal = this.convertPluralWordToSingular(term.normal);
    }

    // Build and classify the token out of the potentially modified term
    const token: CommandToken = new CommandToken(term);
    token.classification = NaturalLanguageService.getClassificationFromTerm(term);
    return token;
  }

  public static isSpecialNoun(token: CommandToken): boolean {
    return (token.name === 'all' || token.name === 'inventory' || token.name === 'verbs' || token.name === 'room');
  }

  private static getClassificationFromTerm(term: LanguageTerm): TokenClassification {

    const classifications = Object.keys(TokenClassification);

    // If this is a possessive noun, we want to interpret it as an adjective
    if (term.tags && term.tags.indexOf('Possessive') >= 0) {
      term.tags.push('Adjective');
      term.bestTag = 'Adjective';
    }

    // Look for a best tag match
    for (const c of classifications) {
      const value: any = TokenClassification[c];

      if (value === term.bestTag) {
        return value;
      }
    }

    // Okay, now that we don't have a best tag match, we'll do an any tag match. This will match in enum order on the classification enum
    for (const c of classifications) {
      const value: any = TokenClassification[c];

      for (const tag of term.tags) {
        if (value === tag) {
          return value;
        }
      }

    }

    return TokenClassification.Unknown;
  }

  public getTokenForWord(word: string): CommandToken {

    // Validate input
    if (!word || word.length  <= 0) {
      throw new Error('When interpreting a single word, that word must be present');
    }

    const terms: LanguageTerm[] = this.getTerms(word);

    return NaturalLanguageService.getTokenFromTerm(terms[0]);
  }

  public getTokensForSentence(sentence: string): CommandToken[] {

    // Great test case: Open the door to the east with the bronze key from the bedroom.

    // Validate input
    if (!sentence || sentence.length  <= 0) {
      throw new Error('I\'m sorry. Did you say something?'); // Cutesy speak for I can't figure out what you're talking about
    }

    const terms: LanguageTerm[] = this.getTerms(sentence);

    const tokens: CommandToken[] = [];

    console.log('Parsing terms into tokens now...');
    let lastToken: CommandToken = null;
    for (const term of terms) {

      const token = NaturalLanguageService.getTokenFromTerm(term);

      // Establish a link to the next token from the prior one
      if (lastToken) {
        lastToken.nextToken = token;
      }

      // Establish a link to the previous token from this token
      token.previousToken = lastToken;

      // Add it to the list of tokens
      this.logger.log(token);
      tokens.push(token);

      // Update the last token reference so that the next iteration of the loop links things correctly
      lastToken = token;

    }

    return tokens;
  }

  /**
   * Converts an input word from plural form to singular form by looking for ies, es, and s at the end of a string.
   * @param {string} word the word to evaluate
   * @returns {string} a best guess at a singular form of that word
   */
  public static convertPluralWordToSingular(word: string): string {

    // On bad input, just go with an empty string
    if (isNullOrUndefined(word)) {
      return '';
    }

    // Ensure we're dealing with a relatively sanitized input before we do an endsWith
    word = word.trim();

    // If it ends in ies, change the i to a y and drop the es.
    if (word.endsWith('ies')) {
      return `${word.substring(0, word.length - 3)}y`;
    }

    // If it ends in es, drop the es. This should be words ending in ch, sh, x, or z.
    if (word.endsWith('es')) {
      return word.substring(0, word.length - 2);
    }

    // If it ends in s, drop the s. This will be most cases.
    if (word.endsWith('s')) {
      return word.substring(0, word.length - 1);
    }

    // Word might not be plural, just go with the input
    return word;
  }

}
