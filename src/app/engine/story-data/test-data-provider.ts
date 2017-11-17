import {StoryData} from './story-data';
import {ActorData} from './actor-data';
import {AliasData} from './alias-data';
import {ItemData} from './item-data';
import {RoomData} from './room-data';
import {EntityData} from './entity-data';
import {VerbData} from './verb-data';
import {WorldEntity} from '../entities/world-entity';
import {Room} from '../entities/room';

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

  public static buildRoom(): RoomData {
    const room: RoomData = new RoomData();
    room.key = 'testRoom';
    this.configureEntity(room);
    return room;
  }

  public static buildVerb(): VerbData {
    const verb: VerbData = new VerbData();
    verb.name = 'test';
    verb.handler = 'Yo dawg, this be a test.';
    return verb;
  }

  private static configureEntity(item: EntityData) {
    item.verbData = [];
    item.contents = [];
    item.aliases = new AliasData();
    item.aliases.adjectives = [];
    item.aliases.nouns = [];
  }

  static buildGameRoom(): Room {
    const room: Room = new Room('Test Room', 'testRoom');
    return room;
  }
}
