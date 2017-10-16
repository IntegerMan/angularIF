import {Story} from '../../engine/story';
import {Room} from '../../engine/room';
import {Player} from '../../engine/player';
import {NavigationService} from '../../engine/navigation.service';

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

  constructor(private navService: NavigationService) {
    super();

    // Basic Metadata
    this.title = 'Angular Cloak of Darkness';
    this.author = 'Matt Eland';
    this.version = '0.1 Pre-Alpha';

    // Define the room objects
    this._foyer = new Room('Foyer of the Opera House');
    this._cloakroom = new Room('Cloakroom');
    this._bar = new Room('Foyer Bar');

    // Set up the player
    this._player = new Player('You');
    this._player.currentRoom = this._foyer;

    // Build out our rooms
    this.configureFoyer();
    this.configureCloakroom();
    this.configureBar();

  }

  private configureBar(): void {

    this._bar.description = 'The bar, much rougher than you\'d have guessed after the opulence of the foyer to the north, is ' +
      'completely empty. There seems to be some sort of message scrawled in the sawdust on the floor.';

    this.navService.northTo(this._bar, this._foyer);

  }

  private configureCloakroom(): void {

    this._cloakroom.description = 'The walls of this small room were clearly once lined with hooks, though now only one remains. ' +
      'The exit is a door to the east.';

    this.navService.eastTo(this._cloakroom, this._foyer);

  }

  private configureFoyer(): void {

    this._foyer.description = 'You are standing in a spacious hall, splendidly decorated in red and gold, with glittering chandeliers ' +
      'overhead. The entrance from the street is to the north, and there are doorways south and west.';

    // Can't go north, but use a custom message for it
    this.navService.northTo(this._foyer,
      null,
      'You\'ve only just arrived, and besides, the weather outside seems to be getting worse.');

    this.navService.southTo(this._foyer, this._bar);
    this.navService.westTo(this._foyer, this._cloakroom);

  }

}
