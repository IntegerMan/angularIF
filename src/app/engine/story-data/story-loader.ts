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

export class StoryLoader {

  private data: StoryData;

  constructor(data: StoryData) {
    this.data = this.cleanseData(data);
  }

  cleanseData(data: StoryData): StoryData {

    data.nodeType = 'storyInfo';
    if (!data.strings) {
      data.strings = {};
    }
    data.strings.nodeType = 'strings';

    for (const room of data.rooms) {
      room.nodeType = 'room';
      if (!room.contents) {
        room.contents = [];
      }
      this.updateParent(room);
    }

    for (const actor of data.actors) {
      actor.nodeType = 'actor';
      if (!actor.contents) {
        actor.contents = [];
      }
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
    story.introResponse = this.buildResponse(this.data.introText, story);

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
      story.rooms.push(this.buildRoom(roomData, story));
    }
    this.initializeNavigationMesh(story);

    // Initialize all the actors
    story.actors.length = 0;
    story.player = null;
    for (const actorData of this.data.actors) {
      const actor = this.buildActor(actorData, story);

      // Add it to the story
      story.actors.push(actor);

    }

    // Validate for no player
    if (!story.player) {
      throw new Error(`${story.name} did not define a player actor.`);
    }

  }

  private buildActor(actorData: ActorData, story: Story): Actor {
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

      // Just a precautionary thing, but let's set the actor's attributes
      actor.attributes.describeWithRoom = false;
    }

    // Set up their inventory
    if (actorData.contents) {
      for (const itemData of actorData.contents) {
        const item = this.buildItem(itemData, story);
        actor.addToInventory(item);
      }
    }

    this.populateCommonFields(actor, actorData);

    // Set the actor's start room
    const room: Room = story.findRoomByKey(actorData.startRoom);
    if (!room) {
      throw new Error(`${story.name} has an actor with key of ${actor.key} that does not map to a starting room.`);
    }

    room.addObject(actor);
    return actor;
  }

  private buildItem(itemData: ItemData, story: Story): WorldEntity {

    const item: WorldEntity = new PortableEntity(itemData.name, itemData.key);

    this.populateCommonFields(item, itemData);

    this.populateEvents(item, itemData.events);

    return item;
  }

  private populateEvents(entity: WorldEntity, events: any) {
    if (events) {
      for (const key of Object.getOwnPropertyNames(events)) {
        entity.events[key] = this.buildResponse(events[key], entity);
      }
    }
  }

  private buildRoom(roomData: RoomData, story: Story): Room {

    const room: Room = new Room(roomData.name, roomData.key);

    this.populateCommonFields(room, roomData);

    this.populateEvents(room, roomData.events);

    // Populate all registered items
    if (roomData.contents) {
      for (const itemData of roomData.contents) {
        const item: WorldEntity = this.buildItem(itemData, story);
        room.addObject(item);
      }
    }

    return room;
  }

  private populateCommonFields(entity: WorldEntity, entityData: EntityData): void {

    this.buildAttributes(entity, entityData);

    // Copy over all verbs
    this.buildVerbHandlers(entity, entityData.verbs);

    this.buildAliases(entity, entityData.aliases);

  }

  private buildAttributes(entity: WorldEntity, entityData: EntityData): void {
    if (entityData.attributes) {
      for (const attribute of Object.getOwnPropertyNames(entityData.attributes)) {
        entity.attributes[attribute] = entityData.attributes[attribute];
      }
    }
  }

  private buildVerbHandlers(entity: WorldEntity, verbData: {}): void {
    if (verbData) {
      for (const verb of Object.getOwnPropertyNames(verbData)) {
        entity.verbs[verb] = this.buildResponse(verbData[verb], entity);
      }
    }
  }

  private buildResponse(input: string | any[], context: any): StoryResponse {

    if (input === undefined)  {
      return undefined;
    }

    return ResponseGenerator.buildResponse(input, context);
  }

  private initializeNavigationMesh(story: Story): void {

    for (const roomData of this.data.rooms) {

      // Set up room to room navigation
      if (roomData.nav) {

        const room: Room = story.findRoomByKey(roomData.key);
        if (!room) {
          continue;
        }

        room.roomLink = {};
        for (const direction of Object.getOwnPropertyNames(roomData.nav)) {

          const value: string | DirectionData = roomData.nav[direction];
          if (!value) {
            continue;
          }

          const dirData: DirectionData = value as DirectionData;

          let target: Room = null;
          let goResponse: StoryResponse = null;
          let lookResponse: StoryResponse = null;

          if (typeof (value) === 'string') {
            target = story.findRoomByKey(value as string);
          } else {
            if (dirData.room) {
              target = story.findRoomByKey(dirData.room);
            }
          }

          // Build out the link
          const link = new RoomLink(room, direction, target);

          if (typeof (value) !== 'string') {

            goResponse = this.buildResponse(dirData.goMessage, link);
            link.goResponse = goResponse;

            lookResponse = this.buildResponse(dirData.lookMessage, link);
            link.lookResponse = lookResponse;

          }

          // Register the link now
          room.roomLink[direction] = link;

        }

      }

    }
  }

  private buildAliases(entity: WorldEntity, alias: AliasData) {

    if (!alias) {
      return;
    }

    entity.addNounAliases(alias.nouns);
    entity.addAdjectiveAliases(alias.adjectives);

  }
  
  private updateParent(container: EntityData) {
    if (container.contents) {
      for (const obj of container.contents) {
        obj.parent = container;
        obj.nodeType = 'entity';

        if (!obj.contents) {
          obj.contents = [];
        }

        this.updateParent(obj);
      }
    }
  }
  
}
