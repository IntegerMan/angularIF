import {Story} from '../../engine/entities/story';
import {Room} from '../../engine/entities/room';
import {Player} from '../../engine/entities/player';
import {NavigationService} from '../../engine/navigation.service';
import {Scenery} from '../../engine/entities/scenery';
import {LoggingService} from '../../logging.service';
import {Hook} from './hook';
import {EntityWeight} from '../../engine/entities/entity-weight.enum';
import {EntitySize} from '../../engine/entities/entity-size.enum';

export class CloakStory extends Story {

  private _foyer: Room;
  private _cloakroom: Room;
  private _bar: Room;
  private _player: Player;
  private _cloak: Scenery;

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
    this.version = '0.1 Pre-Alpha';

    // TODO: It'd be nice to be able to use a RoomBuilder object of some sort with more specialized construction syntax.

    // Define the rooms
    this._foyer = new Room('Foyer of the Opera House');
    this._cloakroom = new Room('Cloakroom');
    this._bar = new Room('Foyer Bar');

    // Define the titular cloak
    this._cloak = new Scenery('black velvet cloak');
    this._cloak.description = 'A handsome cloak, of velvet trimmed with satin, and slightly spattered with raindrops. ' +
      'Its blackness is so deep that it almost seems to suck light from the room.';
    this._cloak.examineDescription = 'The velvet cloak almost seems to have darkness woven into its very fabric. ' +
      'Everything about it is darker than it should be.';

    // Set up the player
    this._player = new Player();
    this._foyer.addObject(this._player);
    this._player.addToInventory(this._cloak);

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
    message.weight = EntityWeight.feather;
    message.size = EntitySize.backpack;
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
