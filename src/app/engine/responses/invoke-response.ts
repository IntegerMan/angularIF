import {StoryResponse} from './story-response';
import {CommandContext} from '../command-context';

export class InvokeResponse extends StoryResponse {

  public invoke(context: CommandContext): void {
    // TODO: Does nothing at the moment...
  }

}
