import {Room} from './room';
import {Player} from './player';
import {LexiconDictionary} from '../parser/lexicon-dictionary';
import {VerbHandler} from '../verbs/verb-handler';
import {WorldEntity} from './world-entity';
import {LoggingService} from '../../utility/logging.service';

export abstract class Story {

  title: string;
  author: string;
  version: string;

  rooms: Room[];
  player: Player;

  verbHandlers: VerbHandler[];

  private dictionaries: LexiconDictionary[];
  fontAwesomeIcon: string = 'fa-book';
  movesTaken: number = 0;
  score: number = 0;
  maxScore: number = 0;

  constructor() {

    this.title = 'Untitled';
    this.author = 'Unattributed';
    this.version = '1.0';

    // Initialize empty lists
    this.dictionaries = [];
    this.verbHandlers = [];

  }

  public initialize(): void {

    this.reset();

    // Set up story variables
    this.rooms = this.getRooms();
    this.player = this.getPlayerActor();
    this.movesTaken = 0;
    this.score = 0;

    // Add our terms to the lexer
    for (const dictionary of this.dictionaries) {
      dictionary.addTerms();
    }

    // Now that we have both rooms and adequate dictionaries, loop through and auto-parse all entities
    this.autodetectNounsAndAdjectives(this.player);
    for (const room of this.rooms) {
      this.autodetectNounsAndAdjectives(room);
    }

  }

  private autodetectNounsAndAdjectives(entity: WorldEntity): void {

    // TODO: Is this the best place for this logic?

    entity.autodetectNounsAndAdjectives();

    if (entity.contents && entity.contents.length > 0) {
      for (const child of entity.contents) {
        this.autodetectNounsAndAdjectives(child);
      }
    }

  }

  public addDictionary(dictionary: LexiconDictionary): void {
    this.dictionaries.push(dictionary);
  }

  protected abstract getRooms(): Room[];

  protected abstract getPlayerActor(): Player;

  restart(): void {
    LoggingService.instance.log('Restarting story now.');
    this.initialize();
  }

  protected abstract reset();
}
