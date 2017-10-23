import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';
import {CommandToken} from '../parser/command-token';
import {Scenery} from '../entities/scenery';
import {TokenClassification} from '../parser/token-classification.enum';
import {WorldEntity} from '../entities/world-entity';
import {PortableEntity} from '../entities/portable-entity';

export class HangHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    if (command.objects.length < 1) {
      context.outputService.displayParserError('I don\'t understand what you\'re trying to hang.',
        'Try saying \'Hang [object name] on [target name]\'.');
      return CommandResult.BuildParseFailedResult();
    }

    const itemToHang: CommandToken = command.objects[0];

    const entityToHang: WorldEntity = itemToHang.entity;

    // Verify that we're talking about is present
    if (!entityToHang) {
      context.outputService.displayParserError(`You don't see ${itemToHang.userInput} here.`);
      return CommandResult.BuildParseFailedResult();
    }

    const that: string = `${entityToHang.article} ${entityToHang.name}`;

    // If it's alive, shame the player.
    if (entityToHang.isAlive) {
      if (entityToHang === context.player) {
        context.outputService.displayStory(`That's awfully morbid. Killing yourself never solved anything.`);
      } else {
        // TODO: If we have hostile entities, this should be tweaked.
        context.outputService.displayStory(`You think about hanging ${that} but then remember that you're not a sociopath.`);
      }
      return CommandResult.BuildActionFailedResult();
    }

    // Ensure we HAVE it first - TODO: it'd be nice to auto-pick-up the item if we don't.
    if (!context.player.containsEntity(entityToHang, true)) {

      context.outputService.displayStory(`You'll have to get ${that} before you can hang it.`);
      return CommandResult.BuildParseFailedResult();

    }

    // Next, let's see if we can determine what we're trying to hang the item on.
    // TODO: With/using may need to be special as in "Hang target from branch with rope"
    const hangerPrep: CommandToken = command.getPrepositionWithFallbacks(['on', 'using', 'with', 'under', 'below']);

    // We couldn't figure out what we were trying to hang the object on
    if (!hangerPrep) {

      // Check to see if the user was trying a hang ... in X
      if (command.getProposition('in')) {
        context.outputService.displayStory(`You can't hang something inside of something else!`);
      } else {
        context.outputService.displayParserError(`I don't understand what you're trying to hang ${that} on.`,
          `Try saying 'Hang ${that} on [object name]'.`);
      }

      return CommandResult.BuildActionFailedResult();
    }

    const hangar: CommandToken = hangerPrep.modifies;
    if (!hangar || hangar.classification === TokenClassification.Verb) {
      context.outputService.displayParserError(`I don't understand what you want to hang ${that} ${hangerPrep.name}.`,
        `Try saying 'Hang ${that} on [object name]'.`);
      return CommandResult.BuildParseFailedResult();
    }

    // Ensure the hook  / hang target is present
    if (!hangar.entity) {
      context.outputService.displayParserError(`You don't see ${hangar.userInput} here.`);
      return CommandResult.BuildActionFailedResult();
    }

    const thatHook: string = `${hangar.entity.article} ${hangar.entity.name}`;

    let hook: WorldEntity = null;
    if (hangerPrep.modifies) {
      hook = hangerPrep.modifies.entity;
    }

    if (!hook) {
      context.outputService.displayStory(`You can't hang anything ${hangerPrep.name} ${thatHook}.`);
      return CommandResult.BuildActionFailedResult();
    }

    if (hook.allowItemHanged(context, entityToHang)) {

      // TODO: Probably should have a direct reference to the container
      context.player.removeFromInventory(entityToHang, context);
      hook.addObject(entityToHang);
      hook.onItemHanged(context, entityToHang);
      entityToHang.onHung(context, hook);

      return CommandResult.BuildActionSuccessResult();
    } else {
      return CommandResult.BuildActionFailedResult();
    }

  }
}
