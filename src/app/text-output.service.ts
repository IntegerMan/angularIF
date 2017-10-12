import { Injectable } from '@angular/core';
import {LoggingService} from './logging.service';

@Injectable()
export class TextOutputService {

  lines: string[] = [];

  constructor(private logger: LoggingService) {
  }

  displayUserCommand(command: string) {
    this.addLine(`> ${command}`);
  }

  displaySystemText(text: string) {
    this.addLine(text);
  }

  displayBlankLine() {
    this.addLine('');
  }

  clear() {
    this.logger.log('Clearing output area');
    this.lines.length = 0;
  }

  private addLine(line: string) {

    // Send the output to the console for good measure
    if (line && line.length > 0) {
      this.logger.log(`OUT: ${line}`);
    }

    // Update the collection. If components displaying this are bound to our lines collection, they'll update
    this.lines.push(line);

    // TODO: We may also need to fire an event here at some point

  }


}
