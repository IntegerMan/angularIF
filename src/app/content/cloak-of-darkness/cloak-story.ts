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
import {NaturalLanguageProcessor} from '../../engine/parser/natural-language-processor';

export class CloakStory extends Story {

  private cloakroom: Room;
  private cloak: WorldEntity;
  private blundersRemaining: number = 2;
  private hasDroppedCloak: boolean = false;


  constructor(processor: NaturalLanguageProcessor) {
    super('Cloak', processor);
  }

  reset(): void {

    // Grab our YAML resource data and stick it into JSON
    if (this.storyData === null || !this.storyData) {

      LoggingService.instance.debug(`Loading story file for ${this.constructor.name}...`);
      this.storyData = <StoryData> require('json-loader!App/Content/Cloak-of-Darkness/CloakOfDarkness.json');

    }

    const loader = new StoryLoader(this.storyData);

    // Read metadata from the story data file
    loader.loadIntoStory(this);

    this.cloakroom = this.findRoomByKey('cloakroom');
    this.cloak = this.findEntityByKey('cloak');
  }

  public previewCloakDrop(context: CommandContext): boolean {

    // TODO: This can be accomplished via an if block with a room check condition

    if (context.currentRoom === this.cloakroom) {

      if (!this.hasDroppedCloak) {

        // TODO: This can be accomplished via an increase score command with a do-once limiter
        context.engine.increaseScore(context);
        this.hasDroppedCloak = true;
      }

      return true;
    }

    context.output.addStory(context.getString('cloakDropFail'));
    return false;
  }

  public previewBarAction(context: CommandContext): boolean {

    if (!this.isCommandAllowedInBar(context)) {
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

    // TODO: I can probably handle this in script if I have an action that sets attributes on
    // another entity and can trigger that on taken and on dropped.

  }

  public onReadMessage(context: CommandContext, message: WorldEntity) {

    // TODO: In order to have this in scripting, I'll need an if / else command
    const isWin: boolean = this.blundersRemaining > 0;

    if (isWin) {
      context.engine.increaseScore(context);
      context.output.addStory(context.getString('messageWin'));
    } else {
      context.output.addStory(context.getString('messageLose'));
    }

    context.engine.endGame(context, isWin);
  }

  private isCommandAllowedInBar(context: CommandContext): boolean {

    const command: Command = context.command;

    context.logger.debug(`Is Command Allowed in bar? ${command.verbHandler}`);
    // TODO: This is way over-complicated. A simpler one can be done via scripting an an IF command

    // Anything is allowed in the light
    if (context.currentRoom.getAttribute('isDark', true) === false) {
      return true;
    }

    if (command.verbHandler) {

      context.logger.debug(`VerbType ${command.verbHandler.verbType}`);

      switch (command.verbHandler.verbType) {

        case VerbType.system:
          // Just because it's dark doesn't mean that the user shouldn't be able to interact with the engine
          return true;

        case VerbType.social:
          // This might be tricky since some social interactions might be physical in nature - hugging, giving something, etc.
          return true;

        case VerbType.look:
          context.output.addStory(context.getString('barCantSee'));
          return false;

        case VerbType.go:
          const dir: CommandToken = command.getFirstDirection();

          if (dir) {

            const link: RoomLink = context.currentRoom.roomLink[dir.name];

            context.logger.debug(`Attempting to go ${dir.name} from the bar.`);
            context.logger.debug(link);

            if (link && link.target) {

              // If we're walking towards a room that is lit, it's allowable.
              if (link.target.hasLight(context)) {
                return true;
              }
            }
          }

          context.output.addStory(context.getString('barBlunder'));
          return false;

        case VerbType.manipulate:
          context.output.addStory(context.getString('barCantManipulate'));
          return false;

      }
    }

    // Default false
    context.output.addStory(context.getString('barBlunder'));
    return false;

  }
}
