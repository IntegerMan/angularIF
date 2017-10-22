import {Story} from '../../engine/entities/story';
import {Room} from '../../engine/entities/room';
import {Player} from '../../engine/entities/player';
import {NavigationService} from '../../engine/navigation.service';
import {Scenery} from '../../engine/entities/scenery';
import {LoggingService} from '../../utility/logging.service';
import {Hook} from './hook';
import {EntityWeight} from '../../engine/entities/entity-weight.enum';
import {EntitySize} from '../../engine/entities/entity-size.enum';
import {Bar} from './bar';
import {Cloak} from './cloak';
import {TextOutputService} from '../../engine/text-output.service';
import {BarMessage} from './bar-message';

export class CloakStory extends Story {

  private _foyer: Room;
  private _cloakroom: Room;
  private _bar: Bar;
  private _player: Player;
  private _cloak: Cloak;

  protected getRooms(): Room[] {
    return [this._foyer, this._cloakroom, this._bar];
  }

  protected getPlayerActor(): Player {
    return this._player;
  }

  constructor(private navService: NavigationService,
              private logger: LoggingService) {
    super();

    // Basic Metadata
    this.title = 'Cloak of Darkness';
    this.description = `A short demo based on Roger Firth's specification to compare various Interactive Fiction development languages.`;
    this.version = '0.6';
    this.fontAwesomeIcon = 'fa-bookmark-o';
    this.maxScore = 2; // Oh no, whatever will we do with two whole points?

    // TODO: It'd be nice to be able to use a RoomBuilder object of some sort with more specialized construction syntax.
    this.reset();

  }

  displayIntroduction(output: TextOutputService): void {
    output.displayStory('Hurrying through the rainswept November night, you\'re glad to see the bright\n' +
      'lights of the Opera House. It\'s surprising that there aren\'t more people about\n' +
      'but, hey, what do you expect in a cheap demo game...?');
  }

  reset(): void {

    // Define the titular cloak
    this._cloak = new Cloak();

    // Define the rooms
    this._foyer = new Room('Foyer of the Opera House');

    this._cloakroom = new Room('Cloakroom');
    this._cloak.cloakroom = this._cloakroom;

    this._bar = new Bar('Foyer Bar');
    this._bar.cloak = this._cloak;

    // Set up the player
    this._player = new Player();
    this._foyer.addObject(this._player);
    this._player.addToInventory(this._cloak);

    // Build out our rooms
    this.configureFoyer(this._foyer);
    this.configureCloakroom(this._cloakroom);
    this.configureBar(this._bar);
  }

  private configureBar(room: Bar): void {

    room.description = 'The bar, much rougher than you\'d have guessed after the opulence of the foyer to the north, is ' +
      'completely empty. There seems to be some sort of message scrawled in the sawdust on the floor.';

    const message: BarMessage = new BarMessage();
    room.message = message;

    this.addToRoom(message, room);

    this.navService.northTo(room, this._foyer);

  }

  private configureCloakroom(room: Room): void {

    room.description = 'The walls of this small room were clearly once lined with hooks, though now only one remains. ' +
      'The exit is a door to the east.';

    const hook: Hook = new Hook('small brass hook');
    hook.addNounAliases(['Peg']);
    this.addToRoom(hook, room);

    this.navService.eastTo(room, this._foyer);

  }

  private configureFoyer(room: Room): void {

    room.description = 'You are standing in a spacious hall, splendidly decorated in red and gold, with glittering chandeliers ' +
      'overhead. The entrance from the street is to the north, and there are doorways south and west.';

    // Can't go north, but use a custom message for it
    this.navService.cannotGoNorth(room,
      'You\'ve only just arrived, and besides, the weather outside seems to be getting worse.');

    this.navService.southTo(room, this._bar);
    this.navService.westTo(room, this._cloakroom);

  }

  private addToRoom(scenery: Scenery, room: Room): void {

    // Remove it from whatever it was in before
    if (scenery.currentRoom) {
      scenery.currentRoom.removeObject(scenery);
    }
    scenery.currentRoom = null;

    // Add it to the new room
    this.logger.log(`Adding object ${scenery.name} to room ${room.name}`);
    room.addObject(scenery);

  }

}
