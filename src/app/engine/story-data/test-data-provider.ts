import {StoryData} from './story-data';
import {ActorData} from './actor-data';
import {AliasData} from './alias-data';
import {ItemData} from './item-data';

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
    this.configureEntity(actor);
    return actor;
  }

  public static buildItem(): ItemData {
    const item: ItemData = new ItemData();
    item.key = 'testItem';
    this.configureEntity(item);
    return item;
  }

  private static configureEntity(item: ItemData) {
    item.verbData = [];
    item.contents = [];
    item.aliases = new AliasData();
    item.aliases.adjectives = [];
    item.aliases.nouns = [];
  }
}
