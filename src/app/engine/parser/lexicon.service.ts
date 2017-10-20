import { Injectable } from '@angular/core';

@Injectable()
export class LexiconService {

  private static _instance: LexiconService;

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

    // Define it as an empty object. We'll add entries via key-value pairs.
    this._lexicon = {
    };

    LexiconService._instance = this;

  }

  private addCustom(term: string, tag: string): void {
    if (term && term.length > 0) {
      this.lexicon[term] = tag;
    }
  }

  public addVerb(term: string): void {
    this.addCustom(term, 'Verb');
  }

  public addAdjective(term: string): void {
    this.addCustom(term, 'Adjective');
  }

  public addNoun(term: string): void {
    this.addCustom(term, 'Noun');
  }

  public addDirection(term: string): void {
    this.addCustom(term, 'Direction');
  }

  public addIgnorable(term: string): void {
    this.addCustom(term, 'Ignorable');
  }
}
