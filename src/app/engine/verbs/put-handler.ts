import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';
import {CommandToken} from '../parser/command-token';
import {TokenClassification} from '../parser/token-classification.enum';
import {WorldEntity} from '../entities/world-entity';
import {HangHandler} from './hang-handler';

export class PutHandler extends VerbHandler {

  get verbType(): VerbType {
    return VerbType.manipulate;
  }

  sendPreviewEvents(command: Command, context: CommandContext): boolean {
    const subject: WorldEntity = this.assertHasObjectWithEntity(command, context);

    return subject.sendPreviewEvent(context, 'drop', this)
      && super.sendPreviewEvents(command, context);
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
    const hangerPrep: CommandToken = command.getPrepositionWithFallbacks(['on', 'using', 'with', 'under', 'below']);
    if (hangerPrep) {
      return HangHandler.attemptHang(context, subject, hangerPrep);
    }

    const containerPrep: CommandToken = command.getPrepositionWithFallbacks(['in', 'inside']);
    if (containerPrep) {
      return PutHandler.attemptPutInside(context, subject, containerPrep);
    }

    context.outputService.displayParserError(`I don't understand where you want to put ${subject.that}.`,
      `Try saying 'Put ${subject.that} in [object name]' or 'Put ${subject.that} on [object name]'.`);

    return CommandResult.BuildParseFailedResult();

  }

  static attemptPutInside(context: CommandContext, subject: WorldEntity, prep: CommandToken): CommandResult {

    const container: CommandToken = prep.getFirstNounModified();

    if (!container) {
      context.outputService.displayParserError(`I don't understand what you want to put ${subject.that} ${prep.name}.`,
        `Try saying 'Put ${subject.that} in [object name]'.`);
      return CommandResult.BuildParseFailedResult();
    }

    // Ensure the hook  / hang target is present
    const containerEntity: WorldEntity = container.entity;
    if (!containerEntity) {
      context.outputService.displayStory(`You can't put anything ${prep.name} ${container.entity.that}.`);
      return CommandResult.BuildActionFailedResult();
    }

    if (containerEntity.allowItemStored(context, subject)) {

      this.depositEntityInContainer(context, subject, containerEntity);
      return CommandResult.BuildActionSuccessResult();

    } else {

      return CommandResult.BuildActionFailedResult();

    }

  }

  private static depositEntityInContainer(context: CommandContext, entityToHang: WorldEntity, container: WorldEntity): void {

    // TODO: Probably should have a direct reference to the container
    context.player.removeFromInventory(entityToHang);
    container.addObject(entityToHang);
    container.onItemStored(context, entityToHang);
    entityToHang.onStored(context, container);

  }

  private assertEntityIsNotAlive(targetEntity: WorldEntity, context: CommandContext): boolean {

    if (!targetEntity.isAlive) {
      return true;
    }

    if (targetEntity === context.player) {
      context.outputService.displayStory(`On second thought, you decide you're fine where you are.`);
    } else {
      context.outputService.displayStory(`That seems a little cruel.`);
    }

    return false;
  }

  private assertHasObjectWithEntity(command: Command, context: CommandContext): WorldEntity {

    if (command.objects.length < 1) {

      context.outputService.displayParserError('I don\'t understand what you\'re trying to place.',
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
