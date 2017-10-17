import {CommandContext} from './command-context';
import {NaturalLanguageService} from './tokenizer/natural-language.service';
import {LoggingService} from '../logging.service';
import {WorldEntity} from './world-entity';
import {CommandToken} from './tokenizer/command-token';

export class Scenery extends WorldEntity {

  nouns: string[];
  adjectives: string[];
  article: string = 'the';

  constructor(name: string) {
    super(name);

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
    this.nouns.push(noun.toLocaleLowerCase());

  }

  addAdjectiveAlias(adjective: string): void {

    LoggingService.instance.log(`Registering adjective '${adjective}' for object '${this.name}'`);
    this.adjectives.push(adjective.toLocaleLowerCase());

  }

  isDescribedByToken(token: CommandToken, context: CommandContext): boolean {

    // Search by nouns registered for the object
    for (const noun of this.nouns) {
      if (noun === token.name) {
        return true;
      }
    }

    // Adjective matches without a noun match are probably a pretty bad idea, but let's do that for now
    for (const adj of this.adjectives) {
      if (adj === token.name) {
        return true;
      }
    }

    // No prayer
    return false;
  }

}
