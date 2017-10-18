import {CommandContext} from './command-context';
import {Room} from './room';
import {LoggingService} from '../logging.service';
import {NaturalLanguageService} from './tokenizer/natural-language.service';
import {CommandToken} from './tokenizer/command-token';

export abstract class WorldEntity {

  nouns: string[];
  adjectives: string[];
  article: string = 'the';
  private _inRoomDescription: string = null;

  private _name: string;

  constructor(name: string) {

    this._name = name;

    this.nouns = [];
    this.adjectives = [];

    this.autodetectNounsAndAdjectives();
  }

  get currentRoom(): Room {
    return this._currentRoom;
  }

  set currentRoom(value: Room) {
    this._currentRoom = value;
  }

  private _currentRoom: Room;

  get name(): string {
    return this._name;
  }

  private _description: string = null;  // To be implemented by concrete classes. Fallbacks will be handled by verb handlers

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  getExamineDescription(context: CommandContext): string {
    return this.description;
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

  get inRoomDescription(): string {
    if (this._inRoomDescription) {
      return this._inRoomDescription;
    }

    // TODO: Should this use article instead? Do we need an isSingular flag?
    return `There is a ${this.name} laying on the ground here.`;
  }

  set inRoomDescription(value: string) {
    this._inRoomDescription = value;
  }

  getInRoomDescription(context: CommandContext): string {

    // We accept context so that individual items can customize their appearance as needed, but by default, we'll go with the property
    return this.inRoomDescription;

  }

  shouldDescribeWithRoom(context: CommandContext): boolean {
    return false;
  }

}
