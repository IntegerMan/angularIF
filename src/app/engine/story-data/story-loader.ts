import {StoryData} from './story-data';
import {Story} from '../entities/story';
import {Room} from '../entities/room';
import {RoomData} from './room-data';
import {StoryResponse} from '../responses/story-response';
import {ResponseGenerator} from '../responses/response-generator';
import {Actor} from '../entities/actor';

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
      story.rooms.push(this.buildRoom(roomData, this.data));
    }

    // Initialize all the actors
    story.actors.length = 0;
    story.player = null;
    for (const actorData of this.data.actors) {

      const actor = new Actor(actorData.name, actorData.key);

      // If this is the player, we'll need to let the story know. Also validate for > 1 player.
      actor.isPlayer = actorData.isPlayer;
      if (actor.isPlayer) {
        if (story.player) {
          throw new Error(`${story.name} tried to set ${actor.key} as the player but ${story.player.key} is already the player.`);
        }
        story.player = actor;
      }

      // Set the stage for the actor
      const room: Room = story.findRoomByKey(actorData.startRoom);
      if (!room) {
        throw new Error(`${story.name} has an actor with key of ${actor.key} that does not map to a starting room.`);
      }
      room.addObject(actor);

      // Add it to the story
      story.actors.push(actor);

    }

    // Validate for no player
    if (!story.player) {
      throw new Error(`${story.name} did not define a player actor.`);
    }

  }


  private buildRoom(roomData: RoomData, storyData: StoryData): Room {

    const room = new Room(roomData.name, roomData.key);
    room.describeResponse = this.buildResponse(roomData.description);
    room.examineResponse = this.buildResponse(roomData.examineDescription);

    return room;

  }

  private buildResponse(input: string | any[]): StoryResponse {
    return ResponseGenerator.buildResponse(input);
  }

}
