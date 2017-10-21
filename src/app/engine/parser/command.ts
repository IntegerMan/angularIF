import {CommandToken} from './command-token';
import {VerbHandler} from '../verbs/verb-handler';
import {CommandContext} from '../command-context';
import {TokenClassification} from './token-classification.enum';

/**
 * Represents an arrangement of tokens into a sentence structure that can be handed off to a verb interpreter. At present, sentences are
 * assumed to be imperative only (e.g. "Open the door" or "Throw the ball from the attic at the stupid gray cat"
 */
export class Command {

  constructor(userInput: string) {

    // Farm out parameters
    this.userInput = userInput;

    // Initialize empty collections
    this.objects = [];
    this.tokens = [];
  }

  userInput: string;
  tokens: CommandToken[];

  verb: CommandToken;
  subject: CommandToken;
  objects: CommandToken[];
  verbHandler: VerbHandler;

  public execute(context: CommandContext): boolean {

    // This is decently important to log
    context.logger.debug(`Handling command associated with sentence ${this.userInput}.`);
    context.logger.debug(this);

    // We have to have a verb here
    if (!this.verb) {

      context.analytics.emitEvent(
        'No Verb',
        this.userInput,
        `${context.story.title} - ${context.currentRoom.name}`,
        context.ifService.commandId);

      context.outputService.displayParserError('I couldn\'t figure out what you want to do. Try starting with a verb.');
      return false;
    }

    // If we don't have a verb handler for the verb in question, display a generic error message
    if (!this.verbHandler) {

      context.analytics.emitEvent(
        'Unknown Verb',
        this.verb.name,
        `${context.story.title} - ${context.currentRoom.name}`,
        context.ifService.commandId);

      context.outputService.displayParserError(`I don't know how to respond to the verb '${this.verb.name}' yet.`);
      return false;
    }

    // Give the room a chance to veto any command
    if (!context.currentRoom.allowCommand(this, context)) {
      return false;
    }

    return this.verbHandler.handleCommand(this, context);

  }

  getFirstDirection(): CommandToken {
    let direction: CommandToken = null;

    const directions: CommandToken[] = this.objects.filter(o => o.classification === TokenClassification.Direction);
    if (directions && directions.length > 0) {
      direction = directions[0];
    }

    return direction;
  }


}
