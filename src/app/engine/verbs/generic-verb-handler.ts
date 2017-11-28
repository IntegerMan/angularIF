import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';
import {WorldEntity} from '../entities/world-entity';
import {EntityBase} from '../entities/entity-base';

/**
 * Handles a generic verb that doesn't need a lot of specific code. This is typically useful for something we expect the user to potentially
 * say in exploring, but don't want to handle a lot of logic around it since it's not typically core to the play experience.
 */
export class GenericVerbHandler extends VerbHandler {

  public isDestructive: boolean;

  private _defaultResponse: string;
  private _verbName: string;
  private _verbType: VerbType;

  constructor(verbName: string, normals: string[], options: any = {}) {

    // Ensure the marquee verb is included
    if (normals.indexOf(verbName) < 0) {
      normals.push(verbName);
    }

    // Pass off supported verbs
    super(normals);

    // Set fields
    if (options && options.verbType) {
      this._verbType = options.verbType;
    } else {
      this._verbType = VerbType.manipulate;
    }
    this._verbName = verbName;
    this.isDestructive = options && options.isDestructive;

    // Set the default response of the verb
    if (options && options.defaultResponse) {
      this._defaultResponse = options.defaultResponse;
    } else {
      this._defaultResponse = `You don't really need to ${verbName} that right now.`;
    }
  }

  get verbType(): VerbType {
    return this._verbType;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {

    if (this.routeCommandToTarget(command, context)) {
      return CommandResult.BuildActionSuccessResult();
    }

    const verbName = command.verb.name;
    const text = this._defaultResponse;
    const hint = `You won't need to ${verbName} to finish the story.`;
    context.outputService.displayStory(text, hint);

    return CommandResult.BuildActionFailedResult();
  }

  private routeCommandToTarget(command: Command, context: CommandContext): boolean {

    const targets: EntityBase[] = command.getDistinctEntitiesFromObjects();

    if (!(targets && targets.length > 0)) {
      return false;
    }

    const entity: WorldEntity = targets[0] as WorldEntity;
    if (!(entity instanceof WorldEntity)) {
      return false;
    }

    if (entity.invokeVerbResponse(context, this._verbName)) {
      return true;
    }

    // We'll use a default response for missing / marker objects
    if (entity.isMissing) {
      context.outputService.displayStory(`You don't see ${entity.that} here.`);
      return true;
    }

    if (this.isDestructive && entity.getAttribute('doNotWishToHarm', false) === true) {
      context.outputService.displayStory(`You don't want to damage ${entity.that}.`);
      return true;
    }

    // Display a special response when trying to manipulate something that is clearly huge
    if (this.verbType === VerbType.manipulate && entity.getAttribute('isMassive', false) === true) {
      context.outputService.displayStory(`You don't seriously expect to be able to ${this._verbName} ${entity.that} do you? It's huge!`);
      return true;
    }

    return false;
  }
}
