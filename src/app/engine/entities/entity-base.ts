import {CommandToken} from '../parser/command-token';
import {NaturalLanguageService} from '../parser/natural-language.service';

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

  addAliases(input: string): void {

    if (!input) {
      return;
    }

    const nouns = NaturalLanguageService.instance.getNouns(input);
    this.addNounAliases(nouns);

    const adjectives = NaturalLanguageService.instance.getAdjectives(input);
    this.addAdjectiveAliases(adjectives);

  }

  addNounAliases(nouns: string[]): void {
    this.addAliasToList(nouns, this.nouns);
  }

  addAdjectiveAliases(adjectives: string[]): void {
    this.addAliasToList(adjectives, this.adjectives);
  }

  private addAliasToList(inputs: string[], list: string[]) {
    if (inputs) {
      for (const input of inputs) {

        const token: CommandToken = NaturalLanguageService.instance.getTokenForWord(input);
        list.push(token.name);
      }
    }
  }

}
