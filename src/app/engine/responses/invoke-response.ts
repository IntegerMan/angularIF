import {StoryResponse} from './story-response';
import {CommandContext} from '../command-context';

export class InvokeResponse extends StoryResponse {

  public invoke(context: CommandContext): boolean {
    // TODO: Does nothing at the moment...
    return true;
  }

}
