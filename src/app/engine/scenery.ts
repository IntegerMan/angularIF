export class Scenery {

  name: string;
  nouns: string[];
  adjectives: string[];

  constructor(name: string) {
    this.name = name;

    this.nouns = [];
    this.adjectives = [];
  }

  registerNoun(noun: string): void {
    this.nouns.push(noun);
  }

  registerAdjective(adjective: string): void {
    this.adjectives.push(adjective);
  }
}
