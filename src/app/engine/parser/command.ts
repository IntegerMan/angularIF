import {CommandToken} from './command-token';
import {VerbHandler} from '../verbs/verb-handler';
import {CommandContext} from '../command-context';
import {TokenClassification} from './token-classification.enum';
import {CommandResult} from '../command-result';
import {VerbType} from '../verbs/verb-type.enum';
import {EntityBase} from '../entities/entity-base';
import {RoomLink} from '../room-link';

/**
 * Represents an arrangement of tokens into a sentence structure that can be handed off to a verb interpreter. At present, sentences are
 * assumed to be imperative only (e.g. "Open the door" or "Throw the ball from the attic at the stupid gray cat"
 */
export class Command {

  userInput: string;
  tokens: CommandToken[];

  verb: CommandToken;
  subject: CommandToken;
  objects: CommandToken[];
  verbHandler: VerbHandler;
  result: CommandResult;
  prepositions: any;
  hasPrepositions: boolean = false;

  constructor(userInput: string) {

    // Farm out parameters
    this.userInput = userInput;

    // Initialize empty collections
    this.objects = [];
    this.tokens = [];
    this.prepositions = {};
  }

  public execute(context: CommandContext): CommandResult {

    context.command = this;

    // This is decently important to shouldLog
    context.logger.debug(`Handling command associated with sentence ${this.userInput}.`);
    context.logger.debug(this);

    // We have to have a verb here
    if (!this.verb) {

      context.analytics.emitEvent(
        'No Verb',
        this.userInput,
        `${context.story.name} - ${context.currentRoom.name}`,
        context.engine.commandId);

      context.output.addParserError('I couldn\'t figure out what you want to do. Try starting with a verb.',
        `For a list of understood verbs, type 'verbs'.`);

      return CommandResult.BuildParseFailedResult();
    }

    // If we don't have a verb handler for the verb in question, display a generic error message
    if (!this.verbHandler) {

      context.analytics.emitEvent(
        'Unknown Verb',
        this.verb.name,
        `${context.story.name} - ${context.currentRoom.name}`,
        context.engine.commandId);

      context.output.addParserError(`I don't know how to respond to the verb '${this.verb.name}' yet.`);
      return CommandResult.BuildParseFailedResult();
    }

    // Make sure the game hasn't already ended
    if (context.engine.isGameOver && (!this.verbHandler || this.verbHandler.verbType !== VerbType.system)) {

      context.output.addParserError(`It's too late for that - the game is already over!`);
      context.output.addPrompt('Would you like to Restart, Restore, or Quit?');

      return CommandResult.BuildFreeActionResult();
    }

    // Give the room a chance to veto any command
    if (!this.verbHandler.sendPreviewEvents(this, context)) {
      return CommandResult.BuildActionFailedResult();
    }

    return this.verbHandler.handleCommand(this, context);

  }

  getFirstDirection(): CommandToken {

    const directions: CommandToken[] =
      this.objects.filter(o => o.classification === TokenClassification.Direction || (o.entity && o.entity instanceof RoomLink));

    if (directions && directions.length > 0) {
      return directions[0];
    }

    // In and out can be directions instead of prepositions
    if (this.prepositions['in']) {
      return this.prepositions['in'];
    }
    if (this.prepositions['out']) {
      return this.prepositions['out'];
    }

    return null;
  }

  addPreposition(preposition: CommandToken): void {
    this.prepositions[preposition.name] = preposition;
    this.hasPrepositions = true;
  }

  getProposition(preposition: string): CommandToken {
    return this.prepositions[preposition];
  }

  getPrepositionWithFallbacks(prepNames: string[]): CommandToken {

    for (const prep of prepNames) {

      // Try the next preposition in line
      const prepToken: CommandToken = this.getProposition(prep);

      // If we've found it, return it
      if (prepToken) {
        return prepToken;
      }

    }

    return null;
  }

  get isTargetingAll(): boolean {
    return this.tokens.filter(t => t.name === 'all' || t.name === 'everything').length > 0;
  }

  getDistinctEntitiesFromObjects(): EntityBase[] {
    return Array.from(new Set(this.objects.filter(o => o.entity).map(o => o.entity)));
  }

}
