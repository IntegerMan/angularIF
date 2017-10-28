import { Actor } from '../entities/actor';
import { ActorData } from './actor-data';
import { DirectionData } from './direction-data';
import { EntityData } from './entity-data';
import { PortableEntity } from '../entities/portable-entity';
import { ResponseGenerator } from '../responses/response-generator';
import { Room } from '../entities/room';
import { RoomData } from './room-data';
import { RoomLink } from '../room-link';
import { Scenery } from '../entities/scenery';
import { Story } from '../entities/story';
import { StoryData } from './story-data';
import { StoryResponse } from '../responses/story-response';
import { WorldEntity } from '../entities/world-entity';

export class StoryLoader {

  private data: StoryData;

  constructor(data: StoryData) {
    this.data = data;
  }

  loadIntoStory(story: Story): void {

    // Standard items go here
    story.name = this.data.name;
    story.version = this.data.version;
    story.fontAwesomeIcon = this.data.icon;
    story.maxScore = this.data.maxScore;
    story.description = this.data.description;
    story.authors = this.data.authors;
    story.introResponse = this.buildResponse(this.data.introText);

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
      if (story.player) {
        throw new Error(`${story.name} tried to set ${actor.key} as the player but ${story.player.key} is already the player.`);
      }
      story.player = actor;
    }

    if (actorData.contents) {
      for (const itemData of actorData.contents) {
        const item: PortableEntity = new PortableEntity(itemData.name, itemData.key);

        this.buildVerbHandlers(item, itemData.verbs);

        // TODO: Aliases

        actor.addToInventory(item);
      }
    }

    // Set the actor's start room
    const room: Room = story.findRoomByKey(actorData.startRoom);
    if (!room) {
      throw new Error(`${story.name} has an actor with key of ${actor.key} that does not map to a starting room.`);
    }

    room.addObject(actor);
    return actor;
  }

  private buildRoom(roomData: RoomData, story: Story): Room {

    const room: Room = new Room(roomData.name, roomData.key);

    // Copy over all verbs
    this.buildVerbHandlers(room, roomData.verbs);

    // TODO: Hook up objects

    return room;

  }

  private buildVerbHandlers(entity: WorldEntity, verbData: {}) {
    for (const verb in verbData) {
      if (verbData.hasOwnProperty(verb)) {
        entity.verbs[verb] = this.buildResponse(verbData[verb]);
      }
    }
  }

  private buildResponse(input: string | any[]): StoryResponse {
    return ResponseGenerator.buildResponse(input);
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

          let target: Room = null;
          let goResponse: StoryResponse = null;
          let lookResponse: StoryResponse = null;

          if (typeof (value) === 'string') {
            target = story.findRoomByKey(value as string);
          } else {
            const dirData: DirectionData = value as DirectionData;
            if (dirData.room) {
              target = story.findRoomByKey(dirData.room);
            }
            goResponse = this.buildResponse(dirData.goMessage);
            lookResponse = this.buildResponse(dirData.lookMessage);
          }

          // Build out the link
          // TODO: Should probably follow the verb model as well
          const link = new RoomLink(room, direction, target);
          link.goResponse = goResponse;
          link.lookResponse = lookResponse;

          // Register the link now
          room.roomLink[direction] = link;

        }

      }

    }
  }

}
