import {StoryData} from './story-data';
import {ActorData} from './actor-data';

export class TestDataProvider {

  public static buildStory(): StoryData {
    const story: StoryData = new StoryData();
    story.rooms = [];
    story.actors = [];
    return story;
  }

  public static buildActor(): ActorData {
    const actor: ActorData = new ActorData();
    actor.isPlayer = false;
    actor.startRoom = 'somewhere';
    actor.key = 'testActor';
    return actor;
  }

}
