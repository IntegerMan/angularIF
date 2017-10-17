import {Story} from '../../engine/story';
import {Room} from '../../engine/room';
import {Player} from '../../engine/player';
import {NavigationService} from '../../engine/navigation.service';
import {Scenery} from '../../engine/scenery';
import {LoggingService} from '../../logging.service';
import {Hook} from './hook';

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

  constructor(private navService: NavigationService,
              private logger: LoggingService) {
    super();

    // Basic Metadata
    this.title = 'Angular Cloak of Darkness';
    this.version = '0.1 Pre-Alpha';

    // TODO: It'd be nice to be able to use a RoomBuilder object of some sort with more specialized construction syntax.

    // Define the rooms
    this._foyer = new Room('Foyer of the Opera House');
    this._cloakroom = new Room('Cloakroom');
    this._bar = new Room('Foyer Bar');

    // Set up the player
    this._player = new Player('You');
    this._player.currentRoom = this._foyer;

    // Build out our rooms
    this.configureFoyer(this._foyer);
    this.configureCloakroom(this._cloakroom);
    this.configureBar(this._bar);

  }

  private configureBar(room: Room): void {

    room.description = 'The bar, much rougher than you\'d have guessed after the opulence of the foyer to the north, is ' +
      'completely empty. There seems to be some sort of message scrawled in the sawdust on the floor.';

    // TODO: Examining the sawdust should end the game in victory or loss
    const message: Scenery = new Scenery('scrawled message');
    message.addAdjectiveAlias('written');
    message.addNounAlias('writing');
    message.addNounAlias('sawdust');
    message.addNounAlias('words');
    message.addNounAlias('word');
    message.addNounAlias('note');
    message.addNounAlias('floor');

    this.addToRoom(message, room);

    this.navService.northTo(room, this._foyer);

  }

  private configureCloakroom(room: Room): void {

    room.description = 'The walls of this small room were clearly once lined with hooks, though now only one remains. ' +
      'The exit is a door to the east.';

    const hook: Hook = new Hook('small brass hook');
    hook.addNounAlias('Peg');
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

  private addToRoom(scenery: Scenery, room: Room) {
    this.logger.log(`Adding object ${scenery.name} to room ${room.name}`);
    room.addObject(scenery);
  }

}
