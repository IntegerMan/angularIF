import {CommandContext} from '../command-context';
import {Room} from './room';
import {LoggingService} from '../../logging.service';
import {NaturalLanguageService} from '../tokenizer/natural-language.service';
import {CommandToken} from '../tokenizer/command-token';
import {EntityWeight} from './entity-weight.enum';
import {EntitySize} from './entity-size.enum';

export abstract class WorldEntity {

  private _weight: EntityWeight;
  private _size: EntitySize;
  private _inRoomDescription: string = null;
  private _name: string;

  contents: WorldEntity[];

  nouns: string[];
  adjectives: string[];
  article: string = 'the';

  constructor(name: string) {

    this._name = name;

    // Initialize collections
    this.nouns = [];
    this.adjectives = [];
    this.contents = [];

    // Set some default sizes for things
    this._weight = EntityWeight.textbook;
    this._size = EntitySize.person;

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

  get size(): EntitySize {
    return this._size;
  }

  set size(value: EntitySize) {
    this._size = value;
  }
  get weight(): EntityWeight {
    return this._weight;
  }

  set weight(value: EntityWeight) {
    this._weight = value;
  }

  private _description: string = null;
  private _examineDescription: string = null;

  get examineDescription(): string {
    return this._examineDescription;
  }

  set examineDescription(value: string) {
    this._examineDescription = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  getExamineDescription(context: CommandContext, isScrutinize: boolean): string {

    // If we're scrutinizing and an examine description is present, go with that.
    if (isScrutinize && this.examineDescription) {
      return this.examineDescription;
    }

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

    // TODO: May not belong at the entity level

    // Special keywords to talk about the room the player is in
    if (token.name === 'room' || token.name === 'here') {
      return (this === (context.currentRoom as WorldEntity));
    }

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

  getInRoomDescription(context: CommandContext, isScrutinize: boolean): string {

    // We accept context so that individual items can customize their appearance as needed, but by default, we'll go with the property
    return this.inRoomDescription;

  }

  shouldDescribeWithRoom(context: CommandContext): boolean {
    return false;
  }

  getContainedEntities(context: CommandContext, includeHidden: boolean): WorldEntity[] {

    const items: WorldEntity[] = [];

    for (const item of this.contents) {
      // TODO: May want to check to see if an item is hidden
      items.push(item);
    }

    return items;
  }

  containsEntity(entity: WorldEntity, isRecursive: boolean): boolean {

    for (const item of this.contents) {
      if (item === entity) {
        return true;
      }

      if (isRecursive) {
        if (item.containsEntity(entity, isRecursive)) {
          return true;
        }
      }
    }

    return false;
  }

}
