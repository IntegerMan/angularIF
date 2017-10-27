import {StoryResponse} from './story-response';
import {OutputResponse} from './output-response';
import {AggregateResponse} from './aggregate-response';

export class ResponseGenerator {

  public static buildResponse(data: string | any[]): StoryResponse {

    if (!data) {
      return null;
    }

    // If it's just text, spit it out
    if (typeof data === 'string') {
      return new OutputResponse(data);
    }

    // TODO: Will need to handle invoke responses as well

    // If it's an array, loop through each member and handle that.
    const aggregate: AggregateResponse = new AggregateResponse();
    for (const item of data) {
      aggregate.add(this.buildResponse(item));
    }
    return aggregate;

  }

}
