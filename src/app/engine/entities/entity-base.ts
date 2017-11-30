import {CommandToken} from '../parser/command-token';
import {NaturalLanguageProcessor} from '../parser/natural-language-processor';

export class EntityBase {

  nouns: string[];
  adjectives: string[];
  key: string;

  private _name: string;

  constructor(name: string, key: string) {

    this._name = name;
    this.key = key;

    this.nouns = [];
    this.adjectives = [];
  }

  get that(): string {
    return this.name;
  }

  get name(): string {
    return this._name;
  }

  addAliases(input: string, processor: NaturalLanguageProcessor): void {

    if (!input) {
      return;
    }

    const nouns = processor.getNouns(input);
    this.addNounAliases(nouns, processor);

    const adjectives = processor.getAdjectives(input);
    this.addAdjectiveAliases(adjectives, processor);

  }

  addNounAliases(nouns: string[], processor: NaturalLanguageProcessor): void {
    EntityBase.addAliasToList(nouns, this.nouns, processor);
  }

  addAdjectiveAliases(adjectives: string[], processor: NaturalLanguageProcessor): void {
    EntityBase.addAliasToList(adjectives, this.adjectives, processor);
  }

  private static addAliasToList(inputs: string[], list: string[], processor: NaturalLanguageProcessor) {
    if (inputs) {
      for (const input of inputs) {

        const token: CommandToken = processor.getTokenForWord(input);
        list.push(token.name);
      }
    }
  }

}
