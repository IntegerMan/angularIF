import {CommandContext} from '../command-context';
import {Room} from './room';
import {LoggingService} from '../../utility/logging.service';
import {NaturalLanguageService} from '../parser/natural-language.service';
import {CommandToken} from '../parser/command-token';
import {EntityWeight} from './entity-weight.enum';
import {EntitySize} from './entity-size.enum';
import {ArrayHelper} from '../../utility/array-helper';
import {StoryResponse} from '../responses/story-response';

export abstract class WorldEntity {

  contents: WorldEntity[];
  parent: WorldEntity = null;
  nouns: string[];
  adjectives: string[];
  article: string = 'the';
  isAlive: boolean = false;
  key: string;

  describeResponse: StoryResponse;
  examineResponse: StoryResponse;

  private _weight: EntityWeight;
  private _size: EntitySize;
  private _inRoomDescription: string = null;
  private _name: string;
  private _currentRoom: Room;

  constructor(name: string, key: string) {

    this._name = name;
    this.key = key;

    // Initialize collections
    this.nouns = [];
    this.adjectives = [];
    this.contents = [];

    // Set some default sizes for things
    this._weight = EntityWeight.textbook;
    this._size = EntitySize.person;

    // Auto-detecting here seems like it would make sense, but we don't yet have adequate dictionaries
  }

  get that(): string {
    return `${this.article} ${this.name}`;
  }

  get currentRoom(): Room {
    return this._currentRoom;
  }

  set currentRoom(value: Room) {
    this._currentRoom = value;
  }

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

  autodetectNounsAndAdjectives(): void {

    const nouns = NaturalLanguageService.instance.getNouns(this.name);
    const adjectives = NaturalLanguageService.instance.getAdjectives(this.name);

    // Strip the phrase and analyze the nouns present
    this.addNounAliases(nouns);
    this.addAdjectiveAliases(adjectives);

  }

  addNounAliases(nouns: string[]): void {

    for (const noun of nouns) {
      LoggingService.instance.log(`Registering noun '${noun}' for object '${this.name}'`);
      this.nouns.push(noun.toLocaleLowerCase());
    }

  }

  addAdjectiveAliases(adjectives: string[]): void {

    for (const adjective of adjectives) {
      LoggingService.instance.log(`Registering adjective '${adjective}' for object '${this.name}'`);
      this.adjectives.push(adjective.toLocaleLowerCase());
    }

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

  invokeDescribeResponse(context: CommandContext, isScrutinize: boolean): void {

    if (isScrutinize && this.examineResponse) {
      this.examineResponse.invoke(context);
    } else if (this.describeResponse) {
      this.describeResponse.invoke(context);
    } else if (isScrutinize) {
      context.outputService.displayStory(`You stare at ${this.that} but fail to notice anything you hadn't noticed before.`);
    } else {
      context.outputService.displayStory(`It is wholly unremarkable.`);
    }

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

  addObject(object: WorldEntity): void {
    object.currentRoom = this.currentRoom;
    object.parent = this;
    this.contents.push(object);
  }

  removeObject(object: WorldEntity): boolean {
    return ArrayHelper.removeIfPresent(this.contents, object);
  }

  allowItemHanged(context: CommandContext, itemToHang: WorldEntity): boolean {

    context.outputService.displayStory(`You can't hang ${itemToHang.that} on ${this.that}.`);

    return false;
  }

  allowItemStored(context: CommandContext, itemToStore: WorldEntity): boolean {

    context.outputService.displayStory(`You can't put ${itemToStore.that} in ${this.that}.`);

    return false;
  }

  onItemHanged(context: CommandContext, itemToHang: WorldEntity): void {
    LoggingService.instance.debug(`Hung ${itemToHang.that} on ${this.that}.`);
  }

  onHung(context: CommandContext, newContainer: WorldEntity): void {
    LoggingService.instance.debug(`${this.that} is now hanging from ${newContainer.that}.`);
  }

  onItemStored(context: CommandContext, itemToStore: WorldEntity): void {
    LoggingService.instance.debug(`Put ${itemToStore.that} in ${this.that}.`);
  }

  onStored(context: CommandContext, newContainer: WorldEntity): void {
    LoggingService.instance.debug(`${this.that} is now stored inside of ${newContainer.that}.`);
  }

}
