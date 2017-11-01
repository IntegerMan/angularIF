import {Story} from '../../engine/entities/story';
import {Room} from '../../engine/entities/room';
import {Player} from '../../engine/entities/player';
import {NavigationService} from '../../engine/navigation.service';
import {Hook} from './hook';
import {Bar} from './bar';
import {Cloak} from './cloak';
import {TextOutputService} from '../../engine/text-output.service';
import {BarMessage} from './bar-message';
import {DictionaryReader} from '../../engine/parser/dictionary-reader';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {LoggingService} from '../../utility/logging.service';

export class CloakStory extends Story {

  private _foyer: Room;
  private _cloakroom: Room;
  private _bar: Bar;
  private _player: Player;
  private _cloak: Cloak;
  private lexer: LexiconService;

  private data: any;

  constructor(private navService: NavigationService) {
    super();

    this.lexer = LexiconService.instance;

    // Basic Metadata
    this.title = 'Cloak of Darkness';
    this.description = `A short demo based on Roger Firth's specification to compare various Interactive Fiction development languages.`;
    this.version = '0.85';
    this.fontAwesomeIcon = 'fa-bookmark-o';
    this.maxScore = 2; // Oh no, whatever will we do with two whole points?

    // TODO: It'd be nice to be able to use a RoomBuilder object of some sort with more specialized construction syntax.
    this.reset();

  }

  reset(): void {

    // Grab our YAML resource data and stick it into JSON
    LoggingService.instance.debug(`Loading story file for ${this.constructor.name}...`);
    this.data = require('json-loader!yaml-loader!App/Content/Cloak-Of-Darkness/CloakOfDarkness.yml');
    LoggingService.instance.debug(this.data);

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

  displayIntroduction(output: TextOutputService): void {
    output.displayStory('Hurrying through the rainswept November night, you\'re glad to see the bright\n' +
      'lights of the Opera House. It\'s surprising that there aren\'t more people about\n' +
      'but, hey, what do you expect in a cheap demo game...?');
  }

  protected getRooms(): Room[] {
    return [this._foyer, this._cloakroom, this._bar];
  }

  protected getPlayerActor(): Player {
    return this._player;
  }

  private configureBar(room: Bar): void {

    room.description = 'The bar, much rougher than you\'d have guessed after the opulence of the foyer to the north, is ' +
      'completely empty. There seems to be some sort of message scrawled in the sawdust on the floor.';

    const message: BarMessage = new BarMessage();
    room.message = message;

    room.addObject(message);

    this.navService.northTo(room, this._foyer);

  }

  private configureCloakroom(room: Room): void {

    room.description = 'The walls of this small room were clearly once lined with hooks, though now only one remains. ' +
      'The exit is a door to the east.';

    const hook: Hook = new Hook('small brass hook');
    hook.addNounAliases(['Peg']);
    room.addObject(hook);

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

}
