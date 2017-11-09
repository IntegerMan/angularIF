import {Story} from '../../engine/entities/story';
import {LoggingService} from '../../utility/logging.service';
import {StoryData} from '../../engine/story-data/story-data';
import {StoryLoader} from '../../engine/story-data/story-loader';
import {CommandContext} from '../../engine/command-context';
import {Room} from '../../engine/entities/room';
import {WorldEntity} from '../../engine/entities/world-entity';
import {CommandToken} from '../../engine/parser/command-token';
import {RoomLink} from '../../engine/room-link';
import {VerbType} from '../../engine/verbs/verb-type.enum';
import {Command} from '../../engine/parser/command';

export class CloakStory extends Story {

  private cloakroom: Room;
  private cloak: WorldEntity;
  private blundersRemaining: number = 2;
  private hasDroppedCloak: boolean = false;


  constructor() {
    super('Cloak');
  }

  reset(): void {

    // Grab our YAML resource data and stick it into JSON
    if (this.storyData === null || !this.storyData) {

      LoggingService.instance.debug(`Loading story file for ${this.constructor.name}...`);
      this.storyData = <StoryData> require('json-loader!yaml-loader!App/Content/Cloak-of-Darkness/CloakOfDarkness.yml');

    }

    const loader = new StoryLoader(this.storyData);

    // Read metadata from the story data file
    loader.loadIntoStory(this);

    this.cloakroom = this.findRoomByKey('cloakroom');
    this.cloak = this.findEntityByKey('cloak');
  }

  public previewCloakDrop(context: CommandContext): boolean {

    if (context.currentRoom === this.cloakroom) {

      if (!this.hasDroppedCloak) {
        context.score.increaseScore();
        this.hasDroppedCloak = true;
      }

      return true;
    }

    context.outputService.displayStory(context.getString('cloakDropFail'));
    return false;
  }

  public previewBarAction(context: CommandContext, command: Command): boolean {

    if (!this.isCommandAllowedInBar(context, command)) {
      if (this.blundersRemaining > 0) {
        this.blundersRemaining -= 1;
      }
      LoggingService.instance.debug(`Counted as blunder. Blunders left: ${this.blundersRemaining}`);
      return false;
    }

    return true;
  }

  public onBarEnter(context: CommandContext): void {

    // Simply put, the room is dark if the cloak is in it.
    LoggingService.instance.debug(this.cloak);
    const isDark = this.cloak.currentRoom === context.currentRoom;

    context.currentRoom.setAttribute('isDark', isDark);

  }

  public onReadMessage(context: CommandContext, message: WorldEntity) {

    const isWin: boolean = this.blundersRemaining > 0;

    if (isWin) {
      context.score.increaseScore();
      context.outputService.displayStory(context.getString('messageWin'));
    } else {
      context.outputService.displayStory(context.getString('messageLose'));
    }

    context.ifService.endGame(isWin);
  }

  private isCommandAllowedInBar(context: CommandContext, command: Command): boolean {

    // Anything is allowed in the light
    if (context.currentRoom.getAttribute('isDark', true) === false) {
      return true;
    }

    if (command.verbHandler) {
      switch (command.verbHandler.verbType) {

        case VerbType.system:
          // Just because it's dark doesn't mean that the user shouldn't be able to interact with the engine
          return true;

        case VerbType.social:
          // This might be tricky since some social interactions might be physical in nature - hugging, giving something, etc.
          return true;

        case VerbType.look:
          context.outputService.displayStory(context.getString('barCantSee'));
          return false;

        case VerbType.go:
          const dir: CommandToken = command.getFirstDirection();

          if (dir) {

            const link: RoomLink = context.currentRoom.roomLink[dir.name];

            if (link && link.target) {

              // If we're walking towards a room that is lit, it's allowable.
              if (link.target.hasLight(context)) {
                return true;
              }
            }
          }

          context.outputService.displayStory(context.getString('barBlunder'));
          return false;

        case VerbType.manipulate:
          context.outputService.displayStory(context.getString('barCantManipulate'));
          return false;

      }
    }

    // Default false
    context.outputService.displayStory(context.getString('barBlunder'));
    return false;

  }
}
