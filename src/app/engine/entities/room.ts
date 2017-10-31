import {CommandToken} from '../parser/command-token';
import {WorldEntity} from './world-entity';
import {CommandContext} from '../command-context';
import {Command} from '../parser/command';
import {VerbType} from '../verbs/verb-type.enum';
import {RoomLink} from '../room-link';

export class Room extends WorldEntity {

  contents: WorldEntity[];
  roomLink: {};

  constructor(name: string, key: string) {
    super(name, key);

    this.roomLink = {};

    // This lets other scripts safely refer to currentRoom in a more generic way
    this.currentRoom = this;

  }

  findObjectsForToken(token: CommandToken, context: CommandContext): WorldEntity[] {

    // Evaluate the room's contents, including actors in it, and any nested item that is visible
    const results: WorldEntity[] = this.addItemsFromContainer(this, token, context);

    // Evaluate the room in case you're trying to find the room or the floor or whatever
    if (this.isDescribedByToken(token, context)) {
      results.push(this);
    }

    return results;
  }

  hasLight(context: CommandContext): boolean {

    const atr = this.getAttribute('isDark');

    if (!atr) {
      return true;
    }

    if (atr === true || atr === false) {
      return !(atr as boolean);
    }

    return atr.toLowerCase() === 'false';
  }

  allowCommand(command: Command, context: CommandContext): boolean {

    if (context.ifService.isGameOver && (!command.verbHandler || command.verbHandler.verbType !== VerbType.system)) {

      context.outputService.displayParserError(`It's too late for that - the game is already over!`);
      context.outputService.displayPrompt('Would you like to Restart, Restore, or Quit?');

      return false;
    }

    if (this.hasLight(context)) {
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
          context.outputService.displayStory(`It's pitch black; you can't see a thing!`);
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

          context.outputService.displayStory(`Blundering around in the dark isn't a good idea!`);
          return false;

        case VerbType.manipulate:
          context.outputService.displayStory(`In the dark? You could easily disturb something!`);
          return false;

      }
    }

    return true;
  }

  private addItemsFromContainer(container: WorldEntity, token: CommandToken, context: CommandContext): WorldEntity[] {

    const results: WorldEntity[] = [];

    for (const entity of container.getContainedEntities(context, false)) {

      if (entity.isDescribedByToken(token, context)) {
        results.push(entity);
      }

      const fromContainer = this.addItemsFromContainer(entity, token, context);
      for (const e of fromContainer) {
        results.push(e);
      }
    }

    return results;
  }

}
