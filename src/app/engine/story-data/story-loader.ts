import {StoryData} from './story-data';
import {Story} from '../entities/story';
import {Room} from '../entities/room';
import {RoomData} from './room-data';
import {StoryResponse} from '../responses/story-response';
import {ResponseGenerator} from '../responses/response-generator';

export class StoryLoader {

  private data: StoryData;

  constructor(data: StoryData) {
    this.data = data;
  }

  loadIntoStory(story: Story): void {

      // Transfer the standard story data objects over to this object
    story.title = this.data.name;
    story.version = this.data.version;
    story.fontAwesomeIcon = this.data.icon;
    story.maxScore = this.data.maxScore;
    story.description = this.data.description;
    story.authors = this.data.authors;
    story.introResponse = this.buildResponse(this.data.introText);

    story.rooms.length = 0;
    story.rooms.length = 0;
    for (const roomData of this.data.rooms) {
      story.rooms.push(this.buildRoom(roomData, this.data));
    }

  }


  private buildRoom(roomData: RoomData, storyData: StoryData): Room {

    const room = new Room(roomData.name, roomData.id);
    room.describeResponse = this.buildResponse(roomData.description);
    room.examineResponse = this.buildResponse(roomData.examineDescription);

    return room;

  }

  private buildResponse(input: string | any[]): StoryResponse {
    return ResponseGenerator.buildResponse(input);
  }
}
