import {Room} from './room';
import {Player} from './player';
import {LexiconDictionary} from '../tokenizer/lexicon-dictionary';
import {VerbHandler} from '../verbs/verb-handler';
import {CommonVerbService} from '../verbs/common-verb.service';

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
