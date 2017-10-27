import {StoryData} from './story-data';
import {Story} from '../entities/story';
import {LoggingService} from '../../utility/logging.service';
import {Room} from '../entities/room';
import {RoomData} from './room-data';

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
    story.introText = this.data.introText;

    story.rooms.length = 0;
    story.rooms.length = 0;
    for (const roomData of this.data.rooms) {
      story.rooms.push(this.generateRoom(roomData, this.data));
    }

  }


  private generateRoom(roomData: RoomData, storyData: StoryData): Room {

    const room = new Room(roomData.name, roomData.id);
    room.description = <string>roomData.description; // TODO: Needs to be more flexible

    return room;

  }

}
