import {Room} from './room';
import {Player} from './player';
import {LexiconDictionary} from '../parser/lexicon-dictionary';
import {VerbHandler} from '../verbs/verb-handler';
import {WorldEntity} from './world-entity';
import {LoggingService} from '../../utility/logging.service';
import {TextOutputService} from '../text-output.service';

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

  private dictionaries: LexiconDictionary[];

  constructor() {

    this.title = 'Untitled';
    this.authors = 'Unattributed';
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

  public addDictionary(dictionary: LexiconDictionary): void {
    this.dictionaries.push(dictionary);
  }

  restart(): void {
    LoggingService.instance.log('Restarting story now.');
    this.initialize();
  }

  displayIntroduction(output: TextOutputService) {
    output.displayStory('The story begins...');
  }

  protected abstract getRooms(): Room[];
  protected abstract getPlayerActor(): Player;
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
