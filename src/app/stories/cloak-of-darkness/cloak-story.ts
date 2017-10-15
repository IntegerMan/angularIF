import {Story} from '../../engine/story';
import {Room} from '../../engine/room';
import {Player} from '../../engine/player';
import {CommonVerbService} from '../../engine/verbs/common-verb.service';

export class CloakStory extends Story {

  private _foyer: Room;
  private _cloakroom: Room;
  private _bar: Room;
  private _player: Player;

  protected getRooms(): Room[] {
    return [this._foyer, this._cloakroom, this._bar];
  }

  protected getPlayerActor(): Player {
    return this._player;
  }

  constructor() {
    super();

    this.title = 'Angular Cloak of Darkness';
    this.author = 'Matt Eland';
    this.version = '0.1 Pre-Alpha';

    // Build out our rooms
    this._foyer = new Room('Foyer of the Opera House');
    this._foyer.description = 'You are standing in a spacious hall, splendidly decorated in red and gold, with glittering [chandeliers] ' +
      'overhead. The entrance from the street is to the {north}, and there are doorways {south} and {west}.';

    this._cloakroom = new Room('Cloakroom');
    this._cloakroom.description = 'The walls of this small room were clearly once lined with [hooks], though now only one remains. ' +
      'The exit is a [door] to the {east}.';

    this._bar = new Room('Foyer bar');
    this._bar.description = 'The bar, much rougher than you\'d have guessed after the opulence of the [foyer] to the {north}, is ' +
      'completely empty. There seems to be some sort of [message] scrawled in the [sawdust] on the [floor].';

    // Set up the player
    this._player = new Player('You');
    this._player.currentRoom = this._foyer;

  }

}
