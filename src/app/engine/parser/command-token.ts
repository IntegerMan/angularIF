import {TokenClassification} from './token-classification.enum';
import {LanguageTerm} from './language-term';
import {WorldEntity} from '../entities/world-entity';
import {StringHelper} from '../../utility/string-helper';
import {ArrayHelper} from '../../utility/array-helper';

export class CommandToken {

  name: string;
  term: LanguageTerm;
  classification: TokenClassification;
  isInferred: boolean = false;

  previousToken: CommandToken;
  nextToken: CommandToken;
  modifies: CommandToken[];
  modifiedBy: CommandToken[];
  entity: WorldEntity;

  constructor(term: LanguageTerm) {

    this.term = term;
    this.name = term.normal;
    this.classification = TokenClassification.Unknown;
    this.modifiedBy = [];
    this.modifies = [];

  }

  get userInput(): string {
    return this.term.text;
  }

  set userInput(value: string) {
    this.term.text = value;
  }

  setModifiedBy(modifier: CommandToken): void {

    if (!modifier) {
      throw new Error('Cannot set modified by on a token to a null token');
    }

    modifier.modifies.push(this);
    this.modifiedBy.push(modifier);
  }

  getCannotSeeName(): string {

    // TODO: This should actually be phonetic on whether it starts with a consonant sound
    if (StringHelper.startsWithVowel(this.name)) {
      return `an ${this.name}`;
    } else {
      return `a ${this.name}`;
    }

  }

  getFirstNounModified(): CommandToken {

    let candidates = ArrayHelper.clone(this.modifies);
    if (candidates) {
      candidates = candidates.filter(c => c.classification !== TokenClassification.Verb);
    } else {
      return null;
    }
    if (candidates.length > 0) {
      return candidates[0];
    } else {
      return null;
    }

  }

}
