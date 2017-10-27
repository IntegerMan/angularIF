import {Room} from './room';
import {Actor} from './actor';
import {VerbHandler} from '../verbs/verb-handler';
import {WorldEntity} from './world-entity';
import {LoggingService} from '../../utility/logging.service';
import {TextOutputService} from '../text-output.service';
import {CommonDictionary} from '../parser/common-dictionary';
import {StoryResponse} from '../responses/story-response';
import {CommandContext} from '../command-context';

export abstract class Story {

  name: string;
  authors: string;
  version: string;
  description: string = null;

  rooms: Room[];

  player: Actor;
  actors: Actor[];

  fontAwesomeIcon: string = 'fa-book';
  maxScore: number = 0;

  verbHandlers: VerbHandler[];
  introResponse: StoryResponse;

  protected output: TextOutputService;

  constructor() {

    this.name = 'Untitled';
    this.authors = 'Unattributed';
    this.version = '1.0';

    // Initialize empty lists
    this.verbHandlers = [];
    this.rooms = [];
    this.actors = [];

    this.output = TextOutputService.instance;

    // TODO: This should probably go elsewhere
    const dict = new CommonDictionary();
    dict.addTerms();

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
      this.introResponse.invoke(context);
    } else {
      context.outputService.displayStory('The story begins...');
    }
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

  protected abstract reset();

  private autodetectNounsAndAdjectives(entity: WorldEntity): void {

    // TODO: Is this the best place for this logic?

    entity.autodetectNounsAndAdjectives();

    if (entity.contents && entity.contents.length > 0) {
      for (const child of entity.contents) {
        this.autodetectNounsAndAdjectives(child);
      }
    }

  }

}
