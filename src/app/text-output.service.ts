import { Injectable } from '@angular/core';
import {LoggingService} from './logging.service';

@Injectable()
export class TextOutputService {

  lines: string[] = [];

  private _logger: LoggingService;

  constructor(logger: LoggingService) {
    this._logger = logger;
  }

  displayUserCommand(command: string) {

    this.addLine(`> ${command}`);

  }

  private addLine(line: string) {

    // Send the output to the console for good measure
    this._logger.log(line);

    this.lines.push(line);

  }
}
