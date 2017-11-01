import {Story} from '../../engine/entities/story';
import {LoggingService} from '../../utility/logging.service';
import {StoryData} from '../../engine/story-data/story-data';
import {StoryLoader} from '../../engine/story-data/story-loader';
import {CommandContext} from '../../engine/command-context';
import {Room} from '../../engine/entities/room';

export class CloakStory extends Story {

  private cloakroom: Room;

  reset(): void {

    // Grab our YAML resource data and stick it into JSON
    LoggingService.instance.debug(`Loading story file for ${this.constructor.name}...`);
    const data: StoryData = <StoryData> require('json-loader!yaml-loader!App/Content/Cloak-Of-Darkness/CloakOfDarkness.yml');
    const loader = new StoryLoader(data);

    // Read metadata from the story data file
    loader.loadIntoStory(this);

    this.cloakroom = this.findRoomByKey('cloakroom');
  }

  public previewCloakDrop(context: CommandContext): boolean {

    if (context.currentRoom === this.cloakroom) {
      return true;
    }

    context.outputService.displayStory(context.getString('cloakDropFail'));
    return false;
  }

  /*
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
  */

}
