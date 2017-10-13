import {Room} from './room';
import {Player} from './player';

export abstract class Story {

  title: string;
  author: string;
  version: string;

  rooms: Room[];
  player: Player;

  constructor(title: string, author: string, version: string) {
    this.title = title;
    this.author = author;
    this.version = version;
  }

  public initialize(): void {

    this.reset();

    // Set up story variables
    this.rooms = this.getRooms();
    this.player = this.getPlayerActor();

  }

  protected abstract getRooms(): Room[];

  protected abstract getPlayerActor(): Player;

  protected reset() {
    // Do stuff
  }


}
