import { Injectable } from '@angular/core';
import {LoggingService} from '../logging.service';
import {TextLine} from './text-line';

@Injectable()
export class TextOutputService {

  lines: TextLine[] = [];

  constructor(private logger: LoggingService) {
  }

  displayUserCommand(command: string) {
    this.addLine(new TextLine(`> ${command}`, 'text-secondary'));
  }

  displayTitle(text: string) {
    this.addLine(new TextLine(text, 'lead text-info'));
  }

  displaySystemText(text: string) {
    this.addLine(new TextLine(text, 'text-info'));
  }

  displayStory(text: string) {
    this.addLine(new TextLine(text, 'text-primary'));
  }

  displayBlankLine() {
    this.addLine(new TextLine('', ''));
  }

  clear() {
    this.logger.log('Clearing output area');
    this.lines.length = 0;
  }

  private addLine(line: TextLine) {

    // Send the output to the console for good measure
    if (line && line.text && line.text.length > 0) {
      this.logger.log(`OUT: ${line.text}`);
    }

    // Update the collection. If components displaying this are bound to our lines collection, they'll update
    this.lines.push(line);

    // TODO: We may also need to fire an event here at some point

  }


}
