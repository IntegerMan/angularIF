import {CommandContext} from '../../engine/command-context';
import {Room} from '../../engine/entities/room';
import {PortableEntity} from '../../engine/entities/portable-entity';
import {EntitySize} from '../../engine/entities/entity-size.enum';
import {EntityWeight} from '../../engine/entities/entity-weight.enum';

export class Cloak extends PortableEntity {

  cloakroom: Room;

  private hasCountedForPoints: boolean = false;

  constructor() {
    super('black velvet cloak');

    this.weight = EntityWeight.textbook;
    this.size = EntitySize.person;

    this.description = 'A handsome cloak, of velvet trimmed with satin, and slightly spattered with raindrops. ' +
      'Its blackness is so deep that it almost seems to suck light from the room.';

    this.examineDescription = 'The velvet cloak almost seems to have darkness woven into its very fabric. ' +
      'Everything about it is darker than it should be.';

    this.inRoomDescription = 'A dark black velvet cloak rests in a heap on the floor.';

    this.addAdjectiveAliases(['smart']);
  }

  allowDrop(context: CommandContext): boolean {

    // Don't allow dropping the cloak anywhere but the cloakroom
    if (context.currentRoom !== this.cloakroom) {
      context.outputService.displayStory('This isn\'t the best place to leave a smart cloak lying around.');
      return false;
    }

    return super.allowDrop(context);
  }

  onDropped(context: CommandContext): void {
    super.onDropped(context);

    if (!this.hasCountedForPoints) {
      this.hasCountedForPoints = true;
      context.score.increaseScore(1);
    }
  }

}
