import {WorldEntity} from './world-entity';
import {LoggingService} from '../../utility/logging.service';
import {ArrayHelper} from '../../utility/array-helper';
import {CommandContext} from '../command-context';
import {EntitySize} from './entity-size.enum';
import {EntityWeight} from './entity-weight.enum';
import {IGettable} from './i-gettable';

export class Player extends WorldEntity implements IGettable {

  constructor() {
    super('you');

    this.article = '';

    // Add some common synonyms for helping the player refer to their character
    this.addNounAliases(['me', 'self', 'yourself', 'myself', 'character', 'avatar', 'player']);

    // Give default self-descriptions here
    this.description = 'You look yourself over and seem to be in roughly the same shape you were in the last time you checked.';
    this.examineDescription = 'Taking some time, you look yourself over, finding the same old scars and blemishes you\'ve accrued ' +
      'over the years. You don\'t love everything about your body, but it\'s yours and you\'re used to it.';

    this.weight = EntityWeight.person;
    this.size = EntitySize.person;

  }

  allowPickup(context: CommandContext): boolean {

    context.outputService.displayFailedAction('You try your best best lines, but you are not impressed.');

    return false;
  }

  addToInventory(item: WorldEntity, context: CommandContext = null): boolean {

    LoggingService.instance.log(`Adding ${item.name} to ${this.name}'s inventory`);

    item.currentRoom = null;
    this.contents.push(item);

    return true;
  }

  removeFromInventory(item: WorldEntity, context: CommandContext = null): boolean {

    // Display a warning if you're trying to do something stupid
    if (this.contents.indexOf(item) < 0) {

      if (context) {
        context.outputService.displayFailedAction(`You aren't carrying ${item.article} ${item.name}.`);
      }

      return false;
    }

    // TODO: Some items may want checks or separate actions if the player is going to remove them

    // Okay, let's remove it!
    if (ArrayHelper.removeIfPresent(this.contents, item)) {

      LoggingService.instance.log(`Dropping ${item.name} from ${this.name}'s inventory to the floor of ${this.currentRoom.name}.`);

      if (context) {
        context.outputService.displaySuccessAction(`You drop ${item.article} ${item.name}.`);
      }

      return true;
    }

    return false;

  }

}
