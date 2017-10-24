import { Injectable } from '@angular/core';
import {TokenClassification} from './token-classification.enum';
import {CommandToken} from './command-token';

@Injectable()
export class LexiconService {

  private static _instance: LexiconService;

  private _fallback: any;

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

    LexiconService._instance = this;

  }

  private addCustom(term: string, tag: string): void {
    if (term && term.length > 0) {
      this.lexicon[term] = tag;
    }
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

  addFallback(term: string, classification: TokenClassification): void {
    this._fallback[term.toLowerCase()] = classification;
  }
}
