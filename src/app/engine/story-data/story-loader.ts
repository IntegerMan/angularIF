import { Actor } from '../entities/actor';
import { ActorData } from './actor-data';
import { DirectionData } from './direction-data';
import { EntityData } from './entity-data';
import { PortableEntity } from '../entities/portable-entity';
import { ResponseGenerator } from '../responses/response-generator';
import { Room } from '../entities/room';
import { RoomData } from './room-data';
import { RoomLink } from '../room-link';
import { Story } from '../entities/story';
import { StoryData } from './story-data';
import { StoryResponse } from '../responses/story-response';
import { WorldEntity } from '../entities/world-entity';
import {AliasData} from './alias-data';
import {ItemData} from './item-data';
import {VerbData} from './verb-data';
import {isNullOrUndefined} from 'util';
import {NaturalLanguageProcessor} from '../parser/natural-language-processor';
import {AttributeData} from './attribute-data';
import {LoggingService} from '../../utility/logging.service';

export class StoryLoader {

  private data: StoryData;

  constructor(data: StoryData) {
    this.data = this.cleanseData(data);
  }

  static ensureCommonDataFields(entity: EntityData) {
    if (!entity.contents) {
      entity.contents = [];
    }
    if (!entity.verbData) {
      entity.verbData = [];
      this.migrateVerbs(entity);
    }
    if (!entity.aliases) {
      entity.aliases = new AliasData();
    }
    if (!entity.aliases.nouns) {
      entity.aliases.nouns = [];
    }
    if (!entity.aliases.adjectives) {
      entity.aliases.adjectives = [];
    }
    if (!entity.attributeData) {
      entity.attributeData = [];
      this.migrateAttributes(entity);
    }

  }

  cleanseData(data: StoryData): StoryData {

    data.nodeType = 'storyInfo';
    if (!data.strings) {
      data.strings = {};
    }
    data.strings.nodeType = 'strings';

    for (const room of data.rooms) {
      room.nodeType = 'room';
      StoryLoader.ensureCommonDataFields(room);
      this.updateParent(room);
    }

    for (const actor of data.actors) {
      actor.nodeType = 'actor';
      StoryLoader.ensureCommonDataFields(actor);
      this.updateParent(actor);
    }

    return data;
  }


  loadIntoStory(story: Story): void {

    // Standard items go here
    story.name = this.data.name;
    story.version = this.data.version;
    story.fontAwesomeIcon = this.data.icon;
    story.maxScore = this.data.maxScore;
    story.description = this.data.description;
    story.authors = this.data.authors;
    story.introResponse = StoryLoader.buildResponse(this.data.introText, story);

    // Copy over string resources
    if (this.data.strings) {
      for (const kvp of this.data.strings) {
        for (const prop of Object.getOwnPropertyNames(kvp)) {
          story.strings[prop] = kvp[prop];
        }
      }
    }

    // Initialize the rooms
    story.rooms.length = 0;
    for (const roomData of this.data.rooms) {
      story.rooms.push(StoryLoader.buildRoom(roomData, story));
    }
    this.initializeNavigationMesh(story);

    // Initialize all the actors
    story.actors.length = 0;
    story.player = null;
    for (const actorData of this.data.actors) {
      const actor = StoryLoader.buildActor(actorData, story);

      // Add it to the story
      story.actors.push(actor);

    }

    // Validate for no player
    if (!story.player) {
      throw new Error(`${story.name} did not define a player actor.`);
    }

  }

  private static buildActor(actorData: ActorData, story: Story): Actor {
    const actor = new Actor(actorData.name, actorData.key);

    // If this is the player, we'll need to let the story know. Also validate for > 1 player.
    actor.isPlayer = actorData.isPlayer;
    if (actor.isPlayer) {

      // Validate that we don't already have a player
      if (story.player) {
        throw new Error(`${story.name} tried to set ${actor.key} as the player but ${story.player.key} is already the player.`);
      }

      // Set the story's player instance
      story.player = actor;
    }

    // Set up their inventory
    if (actorData.contents) {
      for (const itemData of actorData.contents) {
        const item = StoryLoader.buildItem(itemData, story);
        actor.addToInventory(item);
      }
    }

    StoryLoader.populateCommonFields(actor, actorData, story);

    // Set the actor's start room
    const room: Room = story.findRoomByKey(actorData.startRoom);
    if (!room) {
      throw new Error(`${story.name} has an actor with key of ${actor.key} that does not map to a starting room.`);
    }

    room.addObject(actor);
    return actor;
  }

  private static buildItem(itemData: ItemData, story: Story): WorldEntity {

    const item: WorldEntity = new PortableEntity(itemData.name, itemData.key);

    StoryLoader.populateCommonFields(item, itemData, story);

    StoryLoader.populateEvents(item, itemData.events);

    return item;
  }

  private static populateEvents(entity: WorldEntity, events: any) {
    if (events) {
      for (const key of Object.getOwnPropertyNames(events)) {
        entity.events[key] = StoryLoader.buildResponse(events[key], entity);
      }
    }
  }

  private static buildRoom(roomData: RoomData, story: Story): Room {

    const room: Room = new Room(roomData.name, roomData.key);

    StoryLoader.populateCommonFields(room, roomData, story);

    StoryLoader.populateEvents(room, roomData.events);

    // Populate all registered items
    if (roomData.contents) {
      for (const itemData of roomData.contents) {
        const item: WorldEntity = StoryLoader.buildItem(itemData, story);
        room.addObject(item);
      }
    }

    return room;
  }

  private static populateCommonFields(entity: WorldEntity, entityData: EntityData, story: Story): void {

    StoryLoader.buildAttributes(entity, entityData);

    // Copy over all verbs
    StoryLoader.buildVerbHandlers(entity, entityData.verbData);

    StoryLoader.buildAliases(entity, entityData.aliases, story.languageProcessor);

    entity.setAttribute('describeWithRoom', entityData.describeWithRoom);

  }

  private static buildAttributes(entity: WorldEntity, entityData: EntityData): void {
    if (entityData.attributeData) {
      for (const attribute of entityData.attributeData) {
        entity.attributes[attribute.key] = attribute.value;
      }
    }
  }

  private static buildVerbHandlers(entity: WorldEntity, verbData: VerbData[]): void {
    if (verbData) {
      for (const verb of verbData) {
        entity.verbs[verb.name] = StoryLoader.buildResponse(verb.handler, entity);
      }
    }
  }

  private static buildResponse(input: string | any[], context: any): StoryResponse {

    if (isNullOrUndefined(input))  {
      return undefined;
    }

    return ResponseGenerator.buildResponse(input, context);
  }

  private initializeNavigationMesh(story: Story): void {

    for (const roomData of this.data.rooms) {

      if (!roomData.directions) {
        roomData.directions = [];
      }

      // Migrate from the old model of doing things to the new array-based model
      if (roomData.nav) {
        StoryLoader.migrateNavigationStorage(roomData);
      }

      const room: Room = story.findRoomByKey(roomData.key);

      for (const dir of roomData.directions) {
        StoryLoader.createRoomLink(dir, story, room);
      }

    }
  }

  private static migrateNavigationStorage(roomData): void {

    // TODO: Pull Cloak over to the new format, then get rid of this migration method and the .nav property.

    for (const direction of Object.getOwnPropertyNames(roomData.nav)) {

      const value: any = roomData.nav[direction];

      let dir: DirectionData;
      if (typeof (value) === 'string') {
        dir = new DirectionData();
        dir.room = value;
        dir.lookMessage = null;
        dir.goMessage = null;
        dir.aliases = null;
        dir.key = direction;
      } else {
        dir = roomData.nav[direction];
        dir.key = direction;
      }

      roomData.directions.push(dir);
    }
  }

  private static createRoomLink(direction: DirectionData, story: Story, room: Room): void {

    let target: Room = null;

    if (direction.room) {
      target = story.findRoomByKey(direction.room);
    }

    // Build out the link
    const link = new RoomLink(room, direction.key, target);
    link.goResponse = StoryLoader.buildResponse(direction.goMessage, link);
    link.lookResponse = StoryLoader.buildResponse(direction.lookMessage, link);
    link.addAliases(direction.aliases, story.languageProcessor);

    // Register the link now
    room.roomLink[direction.key] = link;

  }

  private static buildAliases(entity: WorldEntity, alias: AliasData, processor: NaturalLanguageProcessor): void {

    if (!alias) {
      return;
    }

    entity.addNounAliases(alias.nouns, processor);
    entity.addAdjectiveAliases(alias.adjectives, processor);

  }

  private updateParent(container: EntityData): void {
    if (container.contents) {
      for (const obj of container.contents) {
        obj.parent = container;
        obj.nodeType = 'entity';

        StoryLoader.ensureCommonDataFields(obj);

        this.updateParent(obj);
      }
    }
  }

  private static migrateVerbs(entity: EntityData): void {

    // Migrate from verbs to verbData
    if ((<any>entity).verbs) {

      for (const prop of Object.getOwnPropertyNames((<any>entity).verbs)) {
        const v: VerbData = new VerbData();
        v.name = prop;
        v.handler = (<any>entity).verbs[prop];
        entity.verbData.push(v);
      }

      // Chop out the old system entirely
      (<any>entity).verbs = undefined;
    }

  }

  private static migrateAttributes(entity: EntityData): void {

    // Migrate from attributes to attributeData
    if ((<any>entity).attributes) {

      for (const prop of Object.getOwnPropertyNames((<any>entity).attributes)) {

        const atr: AttributeData = new AttributeData();
        atr.key = prop;
        atr.value = (<any>entity).attributes[prop];

        entity.attributeData.push(atr);

      }

      // Chop out the old system entirely
      (<any>entity).attributes = undefined;
    }

  }

}
