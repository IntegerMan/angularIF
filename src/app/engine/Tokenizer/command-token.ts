import {TokenClassification} from './token-classification.enum';

export class CommandToken {
  name: string;
  userInput: string;
  classification: TokenClassification;
}
