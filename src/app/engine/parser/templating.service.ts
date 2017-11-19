import { Injectable } from '@angular/core';
import {LoggingService} from '../../utility/logging.service';

@Injectable()
export class TemplatingService {

  public shouldLog: boolean = false;

  private templater: any;

  constructor(private logger: LoggingService) {
    this.templater = require('mustache');
  }

  public applyTemplate(input: string, data: any): string {

    if (this.shouldLog) {
      this.logger.debug(`Applying template to string ${input}`);
      this.logger.debug(data);
    }

    const output: string = this.templater.render(input, data);

    if (this.shouldLog) {
      this.logger.debug(`Templated output: ${output}`);
    }

    return output;
  }

}
