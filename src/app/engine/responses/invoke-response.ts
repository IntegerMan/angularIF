import {StoryResponse} from './story-response';
import {CommandContext} from '../command-context';
import {LoggingService} from '../../utility/logging.service';

export class InvokeResponse extends StoryResponse {

  private methodName: string;

  constructor(methodName: string, data: any) {
    super();

    this.methodName = methodName;

  }

  public invoke(context: CommandContext): boolean {

    const target = context.story;
    if (target[this.methodName]) {
      return target[this.methodName](context);
    }

    LoggingService.instance.error(`Could not invoke non-existent method ${this.methodName} on story object.`);
    LoggingService.instance.debug(target);

    return false;
  }

}
