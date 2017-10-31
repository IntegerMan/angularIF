import {StoryResponse} from './story-response';
import {CommandContext} from '../command-context';

export class AggregateResponse extends StoryResponse {

  private responses: StoryResponse[];

  constructor(responses: StoryResponse[] = null) {
    super();

    this.responses = [];

    if (responses) {
      for (const response of responses) {
        this.responses.push(response);
      }
    }
  }

  add(response: StoryResponse): void {
    if (response) {
      this.responses.push(response);
    }
  }

  invoke(context: CommandContext): boolean {

    let output: boolean = true;

    for (const response of this.responses) {
      if (!response.invoke(context)) {
        output = false;
      }
    }

    return output;
  }

}
