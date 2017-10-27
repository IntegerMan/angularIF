import {Room} from './room';
import {Player} from './player';
import {VerbHandler} from '../verbs/verb-handler';
import {WorldEntity} from './world-entity';
import {LoggingService} from '../../utility/logging.service';
import {TextOutputService} from '../text-output.service';
import {CommonDictionary} from '../parser/common-dictionary';

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
  introText: string | any[]; // TODO: Any[] isn't handled yet

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

  displayIntroduction(output: TextOutputService): void {
    let introText: string | any[] = this.introText;
    if (!introText) {
      introText = 'The story begins...';
    }
    this.renderData(output, introText);
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

  private renderData(output: TextOutputService, data: string | any[]): void {

    if (!data) {
      return;
    }

    // If it's just text, spit it out
    if (typeof data === 'string') {
      output.displayStory(data);
      return;
    }

    // If it's an array, loop through each member and handle that.
    for (const item of data) {
      this.renderData(output, item);
    }

  }

}
