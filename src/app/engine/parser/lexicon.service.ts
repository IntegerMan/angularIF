import { Injectable } from '@angular/core';
import {TokenClassification} from './token-classification.enum';
import {CommandToken} from './command-token';
import {StringHelper} from '../../utility/string-helper';
import {ArrayHelper} from '../../utility/array-helper';
import {CommonDictionary} from './common-dictionary';
import {NaturalLanguageService} from './natural-language.service';
import {NaturalLanguageProcessor} from './natural-language-processor';

@Injectable()
export class LexiconService {

  private static _instance: LexiconService;

  private _fallback: any;
  private _replaceRules: any;
  private _expandRules: any;

  static get instance(): LexiconService {
    if (!this._instance) {
      this._instance = new LexiconService();
    }
    return this._instance;
  }

  public get lexicon(): any {
    return this._lexicon;
  }

  private _lexicon: any;

  constructor() {

    // Define empty objects. We'll add entries via key-value pairs.
    this._lexicon = {};
    this._fallback = {};
    this._replaceRules = {};
    this._expandRules = {};

    LexiconService._instance = this;
  }

  useDefaults(): void {

    const dict = new CommonDictionary();
    dict.addTerms();

  }

  public addIgnorable(term: string): void {
    this.addCustom(term, 'Ignorable');
  }

  public add(tag: string, terms: string[]): void {
    for (const t of terms) {
      this.addCustom(t, tag);
    }
  }

  public attemptToInterpretAsNonVerb(token: CommandToken): boolean {

    // See if we have a fallback entry for it
    if (this._fallback[token.name] !== undefined) {
      token.classification = this._fallback[token.name];
      return true;
    }

    // Try to automate it
    for (const tag of token.term.tags) {

      if (tag === 'Verb') {
        continue;
      }

      // Attempt to interpret the item as if it was a preposition (for example, the term 'using')
      if (tag === 'Preposition') {
        token.classification = TokenClassification.Preposition;
        return true;
      }

      // Attempt to interpret the item as if it was an adjective (for example, 'open')
      if (tag === 'Adjective') {
        token.classification = TokenClassification.Adjective;
        return true;
      }

    }

    return false;

  }

  get replacementRuleCount(): number {
    return Object.getOwnPropertyNames(this._replaceRules).length;
  }

  get expansionRuleCount(): number {
    return Object.getOwnPropertyNames(this._expandRules).length;
  }

  addFallback(term: string, classification: TokenClassification): void {
    this._fallback[term.toLowerCase()] = classification;
  }

  addReplacementRule(searchTerm: string, replacementRule:  string): void {
    this._replaceRules[searchTerm] = replacementRule;
  }

  addExpansionRule(searchTerm: string, replacementRule:  string): void {
    this._expandRules[searchTerm] = replacementRule;
  }

  replaceWords(sentence: string): string {

    for (const searchTerm of Object.getOwnPropertyNames(this._replaceRules)) {
      sentence = StringHelper.replaceAll(sentence, searchTerm, this._replaceRules[searchTerm], false);
    }

    return sentence;

  }

  replaceTokens(tokens: CommandToken[], processor: NaturalLanguageProcessor): CommandToken[] {

      for (const t of tokens) {

        const replacementValue = this._expandRules[t.name];

        if (replacementValue) {

          // Let's build an entirely new token for it
          const replacementToken: CommandToken = processor.getTokenForWord(replacementValue);

          // Preserve the user input for traceability
          replacementToken.userInput = t.userInput;

          ArrayHelper.replaceElement(tokens, t, replacementToken);
        }
      }

      return tokens;
  }

  private addCustom(term: string, tag: string): void {
    if (term && term.length > 0) {
      this.lexicon[term] = tag;
    }
  }

}
