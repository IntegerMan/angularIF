import {StoryResponse} from './story-response';
import {OutputResponse} from './output-response';
import {AggregateResponse} from './aggregate-response';
import {RenderType} from '../../text-rendering/render-type.enum';
import {LoggingService} from '../../utility/logging.service';
import {InvokeResponse} from './invoke-response';

export class ResponseGenerator {

  public static buildResponse(data: any, context: any): StoryResponse {

    if (!data) {
      return null;
    }

    // If it's just text, spit it out
    if (typeof data === 'string') {
      return new OutputResponse(data, RenderType.narrative, context);
    }

    // If it's an array, loop through each member and handle that.
    if (data instanceof Array) {
      const aggregate: AggregateResponse = new AggregateResponse();
      for (const item of data) {
        aggregate.add(this.buildResponse(item, context));
      }

      return aggregate;
    }

    if (data.invoke) {
      return new InvokeResponse(data.invoke, context);
    }

    // Log it and return
    LoggingService.instance.warning('Unknown custom response object. This element will be ignored.');
    LoggingService.instance.debug(data);

    return null;
  }

}
