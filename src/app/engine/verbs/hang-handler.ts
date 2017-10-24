import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';
import {CommandToken} from '../parser/command-token';
import {TokenClassification} from '../parser/token-classification.enum';
import {WorldEntity} from '../entities/world-entity';

export class HangHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    // Figure out what we're talking about.
    const subject: WorldEntity = this.assertHasObjectWithEntity(command, context);
    if (!subject) {
      return CommandResult.BuildParseFailedResult();
    }

    // If it's alive, shame the player.
    if (!this.assertEntityIsNotAlive(subject, context)) {
      return CommandResult.BuildActionFailedResult();
    }

    // Ensure we HAVE it first
    if (!this.assertHasEntity(context, subject)) {
      return CommandResult.BuildParseFailedResult();
    }

    // Next, let's see if we can determine what we're trying to hang the item on.
    const prep: CommandToken = this.getSuspender(command, context, subject);
    if (!prep) {
      return CommandResult.BuildParseFailedResult();
    }

    return HangHandler.attemptHang(context, subject, prep);
  }

  static attemptHang(context: CommandContext, subject: WorldEntity, prep: CommandToken): CommandResult {

    const suspender = prep.modifies;

    if (!suspender || suspender.classification === TokenClassification.Verb) {
      context.outputService.displayParserError(`I don't understand what you want to hang ${subject.that} ${prep.name}.`,
        `Try saying 'Hang ${subject.that} on [object name]'.`);
      return CommandResult.BuildParseFailedResult();
    }

    // Ensure the hook  / hang target is present
    const hook: WorldEntity = suspender.entity;
    if (!hook) {
      context.outputService.displayStory(`You can't hang anything ${prep.name} ${suspender.entity.that}.`);
      return CommandResult.BuildActionFailedResult();
    }

    if (hook.allowItemHanged(context, subject)) {

      this.hangEntityFromSuspender(context, subject, hook);
      return CommandResult.BuildActionSuccessResult();

    } else {

      return CommandResult.BuildActionFailedResult();

    }

  }

  private static hangEntityFromSuspender(context: CommandContext, entityToHang: WorldEntity, suspender: WorldEntity): void {

    // TODO: Probably should have a direct reference to the container
    context.player.removeFromInventory(entityToHang);
    suspender.addObject(entityToHang);
    suspender.onItemHanged(context, entityToHang);
    entityToHang.onHung(context, suspender);

  }

  private getSuspender(command: Command, context: CommandContext, entityToHang: WorldEntity): CommandToken {

    // TODO: With/using may need to be special as in "Hang target from branch with rope"
    const hangerPrep: CommandToken = command.getPrepositionWithFallbacks(['on', 'using', 'with', 'under', 'below']);

    // We couldn't figure out what we were trying to hang the object on
    if (!hangerPrep) {

      // Check to see if the user was trying a hang ... in X
      if (command.getProposition('in')) {
        context.outputService.displayStory(`You can't hang something inside of something else!`);
      } else {
        context.outputService.displayParserError(`I don't understand what you're trying to hang ${entityToHang.that} on.`,
          `Try saying 'Hang ${entityToHang.that} on [object name]'.`);
      }

      return null;
    }
    return hangerPrep;
  }

  private assertEntityIsNotAlive(entityToHang: WorldEntity, context: CommandContext): boolean {

    if (!entityToHang.isAlive) {
      return true;
    }

    if (entityToHang === context.player) {
      context.outputService.displayStory(`That's awfully morbid. Killing yourself never solved anything.`);
    } else {
      context.outputService.displayStory(`You think about hanging ${entityToHang.that} but then remember that you're not a sociopath.`);
    }

    return false;
  }

  private assertHasObjectWithEntity(command: Command, context: CommandContext): WorldEntity {

    if (command.objects.length < 1) {

      context.outputService.displayParserError('I don\'t understand what you\'re trying to hang.',
        'Try saying \'Hang [object name] on [target name]\'.');

      return null;
    }

    const itemToHang: CommandToken = command.objects[0];
    const entityToHang: WorldEntity = itemToHang.entity;

    // Verify that we're talking about is present
    if (!entityToHang) {
      context.outputService.displayParserError(`You don't see ${itemToHang.userInput} here.`);
      return null;
    }

    return entityToHang;
  }
}
