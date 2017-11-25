import {VerbHandler} from './verb-handler';
import {VerbType} from './verb-type.enum';
import {Command} from '../parser/command';
import {CommandContext} from '../command-context';
import {CommandResult} from '../command-result';
import {WorldEntity} from '../entities/world-entity';

/**
 * Handles a generic verb that doesn't need a lot of specific code. This is typically useful for something we expect the user to potentially
 * say in exploring, but don't want to handle a lot of logic around it since it's not typically core to the play experience.
 */
export class GenericVerbHandler extends VerbHandler {

  private _defaultResponse: string;
  private _verbName: string;
  private _verbType: VerbType;

  constructor(verbName: string, verbType: VerbType, normals: string[], defaultResponse: string = null) {

    // Ensure the marquee verb is included
    if (normals.indexOf(verbName) < 0) {
      normals.push(verbName);
    }

    // Pass off supported verbs
    super(normals);

    // Set fields
    this._verbName = verbName;
    this._verbType = verbType;

    // Set the default response of the verb
    if (defaultResponse) {
      this._defaultResponse = defaultResponse;
    } else {
      this._defaultResponse = `You don't really need to ${verbName} that right now.`;
    }
  }

  get verbType(): VerbType {
    return this._verbType;
  }

  handleCommand(command: Command, context: CommandContext): CommandResult {
    let respondedTo: boolean = false;

    const targets: WorldEntity[] = command.getDistinctEntitiesFromObjects();
    if (targets && targets.length > 0) {

      const entity: WorldEntity = targets[0];

      respondedTo = entity.invokeVerbResponse(context, this._verbName);

      // We'll use a default response for missing / marker objects
      if (!respondedTo && entity.isMissing) {
        context.outputService.displayStory(`You don't see ${entity.that} here.`);
        respondedTo = true;
      }

    }

    if (!respondedTo) {

      const verbName = command.verb.name;
      const text = this._defaultResponse;
      const hint = `You won't need to ${verbName} to finish the story.`;
      context.outputService.displayStory(text, hint);

      return CommandResult.BuildActionFailedResult();
    } else {
      return CommandResult.BuildActionSuccessResult();
    }
  }
}
