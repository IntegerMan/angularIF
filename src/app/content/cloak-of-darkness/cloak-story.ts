import {Story} from '../../engine/entities/story';
import {Room} from '../../engine/entities/room';
import {Player} from '../../engine/entities/player';
import {NavigationService} from '../../engine/navigation.service';
import {Hook} from './hook';
import {Bar} from './bar';
import {Cloak} from './cloak';
import {TextOutputService} from '../../engine/text-output.service';
import {BarMessage} from './bar-message';
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
  private output: TextOutputService;

  constructor(private navService: NavigationService) {
    super();

    this.lexer = LexiconService.instance;
    this.output = TextOutputService.instance;

    this.reset();
  }

  reset(): void {

    // Grab our YAML resource data and stick it into JSON
    LoggingService.instance.debug(`Loading story file for ${this.constructor.name}...`);
    this.data = require('json-loader!yaml-loader!App/Content/Cloak-Of-Darkness/CloakOfDarkness.yml');
    LoggingService.instance.debug(this.data);

    // Read metadata from the story data file
    this.title = this.data.name;
    this.version = this.data.version;
    this.fontAwesomeIcon = this.data.icon;
    this.maxScore = this.data['max score'];
    this.description = this.data.description;
    this.authors = this.data.authors;

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
    this.renderData(this.data.introText);
  }

  protected getRooms(): Room[] {
    return [this._foyer, this._cloakroom, this._bar];
  }

  protected getPlayerActor(): Player {
    return this._player;
  }

  private renderData(data: any): void {

    if (!data) {
      return;
    }

    // If it's just text, spit it out
    if (typeof data === 'string') {
      this.output.displayStory(data);
      return;
    }

    // If it's an array, loop through each member and handle that.
    for (const item of data) {
      this.renderData(item);
    }

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
