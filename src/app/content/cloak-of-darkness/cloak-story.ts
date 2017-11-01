import {Story} from '../../engine/entities/story';
import {LoggingService} from '../../utility/logging.service';
import {StoryData} from '../../engine/story-data/story-data';
import {StoryLoader} from '../../engine/story-data/story-loader';
import {CommandContext} from '../../engine/command-context';
import {Room} from '../../engine/entities/room';
import {WorldEntity} from '../../engine/entities/world-entity';

export class CloakStory extends Story {

  private cloakroom: Room;
  private cloak: WorldEntity;

  reset(): void {

    // Grab our YAML resource data and stick it into JSON
    LoggingService.instance.debug(`Loading story file for ${this.constructor.name}...`);
    const data: StoryData = <StoryData> require('json-loader!yaml-loader!App/Content/Cloak-Of-Darkness/CloakOfDarkness.yml');
    const loader = new StoryLoader(data);

    // Read metadata from the story data file
    loader.loadIntoStory(this);

    this.cloakroom = this.findRoomByKey('cloakroom');
    this.cloak = this.findEntityByKey('cloak');
  }

  public previewCloakDrop(context: CommandContext): boolean {

    if (context.currentRoom === this.cloakroom) {
      return true;
    }

    context.outputService.displayStory(context.getString('cloakDropFail'));
    return false;
  }

  public onBarEnter(context: CommandContext): void {

    // Simply put, the room is dark if the cloak is in it.
    LoggingService.instance.table(this.cloak);
    const isDark = this.cloak.currentRoom === context.currentRoom;

    context.currentRoom.setAttribute('isDark', isDark);

  }

}
