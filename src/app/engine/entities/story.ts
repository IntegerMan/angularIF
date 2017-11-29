import {Room} from './room';
import {Actor} from './actor';
import {VerbHandler} from '../verbs/verb-handler';
import {WorldEntity} from './world-entity';
import {LoggingService} from '../../utility/logging.service';
import {TextOutputService} from '../text-output.service';
import {StoryResponse} from '../responses/story-response';
import {CommandContext} from '../command-context';
import {StoryData} from '../story-data/story-data';

export class Story {

  name: string;
  key: string;
  authors: string;
  version: string;
  description: string = null;
  storyData: StoryData = null;

  rooms: Room[];
  player: Actor;
  actors: Actor[];
  strings: {};

  fontAwesomeIcon: string = 'fa-book';
  maxScore: number = 0;

  verbHandlers: VerbHandler[];
  introResponse: StoryResponse;

  constructor(key: string) {

    this.name = 'Untitled';
    this.authors = 'Unattributed';
    this.version = '1.0';
    this.key = key;

    // Initialize empty lists
    this.verbHandlers = [];
    this.rooms = [];
    this.actors = [];
    this.strings = {};

  }

  public initialize(): void {

    this.reset();

    // Now that we have both rooms and adequate dictionaries, loop through and auto-parse all entities
    this.autodetectNounsAndAdjectives(this.player);
    for (const room of this.rooms) {
      this.autodetectNounsAndAdjectives(room);
    }

  }

  restart(): void {
    LoggingService.instance.log('Restarting story now.');
    this.initialize();
  }

  displayIntroduction(context: CommandContext): void {

    if (this.introResponse) {
      this.introResponse.invoke(context, this);
    } else {
      context.output.addStory('The story begins...');
    }
  }

  findEntityByKey(key: string): WorldEntity {

    if (!key) {
      return null;
    }

    let entity: WorldEntity;

    for (const room of this.rooms) {
      entity = room.findEntityByKey(key);
      if (entity) {
        return entity;
      }
    }

    for (const actor of this.actors) {
      entity = actor.findEntityByKey(key);
      if (entity) {
        return entity;
      }
    }

    return null;
  }

  findRoomByKey(key: string): Room {

    if (!key) {
      return null;
    }

    for (const room of this.rooms) {
      if (room.key === key) {
        return room;
      }
    }

    return null;
  }

  findActorByKey(key: string): Actor {

    if (!key) {
      return null;
    }

    for (const actor of this.actors) {
      if (actor.key === key) {
        return actor;
      }
    }

    return null;
  }

  protected reset(): void {

  }

  private autodetectNounsAndAdjectives(entity: WorldEntity): void {

    // TODO: Is this the best place for this logic?
    entity.addAliases(entity.name);

    if (entity.contents && entity.contents.length > 0) {
      for (const child of entity.contents) {
        this.autodetectNounsAndAdjectives(child);
      }
    }

  }

}
