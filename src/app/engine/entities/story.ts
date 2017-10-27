import {Room} from './room';
import {Player} from './player';
import {VerbHandler} from '../verbs/verb-handler';
import {WorldEntity} from './world-entity';
import {LoggingService} from '../../utility/logging.service';
import {TextOutputService} from '../text-output.service';
import {CommonDictionary} from '../parser/common-dictionary';
import {StoryResponse} from '../responses/story-response';
import {CommandContext} from '../command-context';

export abstract class Story {

  title: string;
  authors: string;
  version: string;
  description: string = null;

  rooms: Room[];
  player: Player;

  fontAwesomeIcon: string = 'fa-book';
  maxScore: number = 0;

  verbHandlers: VerbHandler[];
  introResponse: StoryResponse;

  protected output: TextOutputService;

  constructor() {

    this.title = 'Untitled';
    this.authors = 'Unattributed';
    this.version = '1.0';

    // Initialize empty lists
    this.verbHandlers = [];
    this.rooms = [];

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

  // protected abstract getRooms(): Room[];
  // protected abstract getPlayerActor(): Player;
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
