import {Room} from './room';
import {Player} from './player';
import {LexiconDictionary} from '../tokenizer/lexicon-dictionary';
import {VerbHandler} from '../verbs/verb-handler';
import {CommonVerbService} from '../verbs/common-verb.service';
import {WorldEntity} from './world-entity';

export abstract class Story {

  title: string;
  author: string;
  version: string;

  rooms: Room[];
  player: Player;

  verbHandlers: VerbHandler[];

  private dictionaries: LexiconDictionary[];

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

  protected reset() {
    // Do stuff
  }


}
