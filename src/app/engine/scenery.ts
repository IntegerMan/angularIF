import {CommandContext} from './command-context';
import {NaturalLanguageService} from './tokenizer/natural-language.service';
import {LoggingService} from '../logging.service';

export class Scenery {

  name: string;
  nouns: string[];
  adjectives: string[];

  constructor(name: string) {
    this.name = name;

    this.nouns = [];
    this.adjectives = [];

    this.autodetectNounsAndAdjectives();

  }

  private autodetectNounsAndAdjectives(): void {

    this.nouns.length = 0;
    this.adjectives.length = 0;

    // Strip the phrase and analyze the nouns present
    for (const noun of NaturalLanguageService.instance.getNouns(this.name)) {
      this.addNounAlias(noun);
    }

    // Strip the phrase and analyze the adjectives present
    for (const adjective of NaturalLanguageService.instance.getAdjectives(this.name)) {
      this.addAdjectiveAlias(adjective);
    }

    // TODO: For each one of these, we should probably also be registering synonyms.

  }

  addNounAlias(noun: string): void {

    LoggingService.instance.log(`Registering noun '${noun}' for object '${this.name}'`);
    this.nouns.push(noun);

  }

  addAdjectiveAlias(adjective: string): void {

    LoggingService.instance.log(`Registering adjective '${adjective}' for object '${this.name}'`);
    this.adjectives.push(adjective);

  }

  getExamineDescription(context: CommandContext): string {
    return `The ${name} looks fairly ordinary.`;
  }

}
