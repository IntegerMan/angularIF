import {TokenClassification} from './token-classification.enum';
import {LanguageTerm} from './language-term';
import {WorldEntity} from '../entities/world-entity';

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
}
