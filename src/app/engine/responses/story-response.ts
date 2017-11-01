/**
 * This describes any event that can occur as a result of an action.
 */
import {CommandContext} from '../command-context';

export abstract class StoryResponse {

  public abstract invoke(context: CommandContext, data: any): boolean;

}
