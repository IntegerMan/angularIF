import {TokenClassification} from './token-classification.enum';
import {LanguageTerm} from './language-term';

export class CommandToken {

  name: string;
  term: LanguageTerm;
  classification: TokenClassification;
  isInferred: boolean = false;

  get userInput(): string {
    return this.term.text;
  }

  constructor(term: LanguageTerm) {

    this.term = term;
    this.name = term.normal;
    this.classification = TokenClassification.Unknown;

  }

}
