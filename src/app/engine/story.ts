import {Room} from './room';
import {Player} from './player';
import {LexiconDictionary} from './tokenizer/lexicon-dictionary';

export abstract class Story {

  title: string;
  author: string;
  version: string;

  rooms: Room[];
  player: Player;

  private dictionaries: LexiconDictionary[];

  constructor(title: string, author: string, version: string) {
    this.title = title;
    this.author = author;
    this.version = version;
    this.dictionaries = [];
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
