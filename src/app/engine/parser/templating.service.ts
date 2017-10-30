import { Injectable } from '@angular/core';
import {LoggingService} from '../../utility/logging.service';

@Injectable()
export class TemplatingService {

  private templater: any;

  constructor(private logger: LoggingService) {
    this.templater = require('mustache');
  }

  public applyTemplate(input: string, data: any): string {

    this.logger.debug(`Applying template to string ${input}`);
    this.logger.debug(data);

    const output: string = this.templater.render(input, data);

    this.logger.debug(`Templated output: ${output}`);

    return output;
  }

}
