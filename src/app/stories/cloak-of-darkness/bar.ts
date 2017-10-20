import {Room} from '../../engine/entities/room';
import {CommandContext} from '../../engine/command-context';
import {WorldEntity} from '../../engine/entities/world-entity';

export class Bar extends Room {

  cloak: WorldEntity;

  hasLight(context: CommandContext): boolean {
    // If the room is dark OR the cloak of darkness is present in the room, the room will be dark.
    return super.hasLight(context) && !context.currentRoom.containsEntity(this.cloak, true);
  }
}
