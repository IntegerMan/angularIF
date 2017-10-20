import {TokenClassification} from './token-classification.enum';
import {LanguageTerm} from './language-term';
import {WorldEntity} from '../entities/world-entity';
import {StringHelper} from '../../utility/string-helper';

export class CommandToken {

  name: string;
  term: LanguageTerm;
  classification: TokenClassification;
  isInferred: boolean = false;

  previousToken: CommandToken;
  nextToken: CommandToken;
  modifies: CommandToken;
  modifiedBy: CommandToken[];

  // TODO: Do I want entity or entities?  How should disambiguation work?
  entity: WorldEntity;

  /***
   * Gets a value indicating whether or not the term associated with this token was identified as plural
   * @returns {boolean} whether or not the term is plural
   */
  get isPlural(): boolean {
    return this.term && this.term.tags.filter(t => t === 'Plural').length > 0;
  }

  get userInput(): string {
    return this.term.text;
  }

  set userInput(value: string) {
    this.term.text = value;
  }

  constructor(term: LanguageTerm) {

    this.term = term;
    this.name = term.normal;
    this.classification = TokenClassification.Unknown;
    this.modifiedBy = [];

  }

  setModifiedBy(modifier: CommandToken): void {

    if (!modifier) {
      throw new Error('Cannot set modified by on a token to a null token');
    }

    modifier.modifies = this;
    this.modifiedBy.push(modifier);
  }

  getCannotSeeName(): string {

    if (this.isPlural) {
      return this.name;
    } else if (StringHelper.startsWithVowel(this.name)) {
      return `an ${this.name}`;
    } else {
      return `a ${this.name}`;
    }

  }

}
