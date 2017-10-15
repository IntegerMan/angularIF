import {CommandToken} from './command-token';

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
    this.sentenceModifiers = [];
  }

  userInput: string;
  tokens: CommandToken[];

  verb: CommandToken;
  subject: CommandToken;
  objects: CommandToken[];
  sentenceModifiers: CommandToken[];

}
