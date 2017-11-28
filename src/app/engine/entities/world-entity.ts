import {CommandContext} from '../command-context';
import {Room} from './room';
import {LoggingService} from '../../utility/logging.service';
import {CommandToken} from '../parser/command-token';
import {ArrayHelper} from '../../utility/array-helper';
import {StringHelper} from '../../utility/string-helper';
import {StoryResponse} from '../responses/story-response';
import {isNullOrUndefined} from 'util';
import {EntityBase} from './entity-base';

export abstract class WorldEntity extends EntityBase {

  contents: WorldEntity[];
  parent: WorldEntity = null;
  isAlive: boolean = false;

  verbs: any;
  attributes: any;
  events: any;

  private _inRoomDescription: string = null;
  private _currentRoom: Room;

  constructor(name: string, key: string) {
    super(name, key);

    // Initialize collections
    this.contents = [];
    this.attributes = {};
    this.verbs = {};
    this.events = {};

    // Auto-detecting here seems like it would make sense, but we don't yet have adequate dictionaries
  }

  getArticle(defaultArticle: string = 'the'): string {
    const value = this.getAttribute('article', defaultArticle);
    if (isNullOrUndefined(value)) {
      return '';
    } else {
      return value;
    }
  }

  get that(): string {
    return `${this.getArticle()} ${this.name}`.trim();
  }

  get currentRoom(): Room {
    return this._currentRoom;
  }

  set currentRoom(value: Room) {
    this._currentRoom = value;

    for (const child of this.contents) {
      child.currentRoom = value;
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

    if (!this.attributes) {
      return true;
    }

    return this.getAttribute('describeWithRoom', true);
  }

  invokeVerbResponse(context: CommandContext, verbName: string, data: any = null): boolean {

    if (this.verbs[verbName]) {
      const response: StoryResponse = this.verbs[verbName];

      return response.invoke(context, data);
    }

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

  containsEntity(entity: EntityBase, isRecursive: boolean): boolean {

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

    if (this.hasAttribute('allowHang')) {
      return true;
    }

    context.outputService.displayStory(`You can't hang ${itemToHang.that} or anything else on ${this.that}.`);

    return false;
  }

  allowItemStored(context: CommandContext, itemToStore: WorldEntity): boolean {

    context.outputService.displayStory(`You can't put ${itemToStore.that} in ${this.that}.`);

    return false;
  }

  onItemHanged(context: CommandContext, itemToHang: WorldEntity): void {

    LoggingService.instance.debug(`Hung ${itemToHang.that} on ${this.that}.`);
    context.outputService.displayStory(`You hang ${itemToHang.that} on ${this.that}.`);

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

  get hasContents(): boolean {
    return this.contents && this.contents.length > 0;
  }

  get contentsText(): string {
    return StringHelper.toOxfordCommaList(this.contents.map(c => c.name));
  }

  hasAttribute(attributeName: string): boolean {
    return this.attributes && this.attributes.hasOwnProperty(attributeName);
  }

  getAttribute(attributeName: string, defaultValue: any): any {

    if (!this.hasAttribute(attributeName)) {
      return defaultValue;
    }

    let value = this.attributes[attributeName];

    if (value && value === 'false') {
      value = false;
    } else if (value && value === 'true') {
      value = true;
    }

    return value;
  }

  sendPreviewEvent(context: CommandContext, eventName: string, data: any): boolean {

    eventName = `preview${StringHelper.capitalize(eventName)}`;

    context.logger.debug(`Event ${eventName} occurring for ${this.that}.`);

    if (!this.events.hasOwnProperty(eventName)) {
      return true;
    }

    const handler: StoryResponse = this.events[eventName];
    if (!handler) {
      return true;
    }

    context.logger.debug(`Sending ${eventName} to event handler.`);
    context.logger.debug(handler);
    return handler.invoke(context, data);
  }

  sendEvent(context: CommandContext, eventName: string, data: any): void {

    context.logger.debug(`Event ${eventName} occurred for ${this.that}.`);

    if (!this.events.hasOwnProperty(eventName)) {
      return;
    }

    const handler: StoryResponse = this.events[eventName];
    if (handler) {
      context.logger.debug(`Sending ${eventName} to event handler.`);
      context.logger.debug(handler);
      handler.invoke(context, data);
    }

  }

  findEntityByKey(key: string): WorldEntity {

    if (this.key === key) {
      return this;
    }

    let entity: WorldEntity;

    for (const item of this.contents) {
      entity = item.findEntityByKey(key);
      if (entity) {
        return entity;
      }
    }

    return undefined;

  }

  setAttribute(name: string, value: any): void {

    // LoggingService.instance.debug(`Setting ${this.key}.${name} to ${value}`);

    this.attributes[name] = value;
  }

  /**
   * Gets a value indicating whether or not this entity has the 'missing' attribute associated with it.
   * The missing attribute indicates that an object is not truly present, but may need special interaction code.
   * @returns {boolean} true if the missing attribute is present and set to true, otherwise false.
   */
  get isMissing(): boolean {
    return this.getAttribute('missing', false);
  }

  /**
   * Gets a value indicating whether or not this entity has the 'portable' attribute associated with it.
   * The portable attribute indicates that an object can be picked up.
   * @returns {boolean} true if the portable attribute is present and set to true, otherwise false.
   */
  get isPortable(): boolean {
    return this.getAttribute('portable', false);
  }

}
