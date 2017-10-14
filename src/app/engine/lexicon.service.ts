import { Injectable } from '@angular/core';

@Injectable()
export class LexiconService {

  public get lexicon(): any {
    return this._lexicon;
  }

  private _lexicon: any;

  constructor() {

    // Define it as an empty object. We'll add entries via key-value pairs.
    this._lexicon = {
    };

  }

  public add(term: string, tag: string): void {
    if (term && term.length > 0) {
      this.lexicon[term] = tag;
    }
  }

}
