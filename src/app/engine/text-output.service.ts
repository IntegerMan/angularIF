import { Injectable } from '@angular/core';
import {LoggingService} from '../logging.service';
import {TextLine} from '../text-rendering/text-line';
import {CommandType} from '../text-rendering/command-type.enum';
import {Command} from './tokenizer/command';

@Injectable()
export class TextOutputService {

  lines: TextLine[] = [];

  constructor(private logger: LoggingService) {
  }

  displayUserCommand(command: string, sentence: any): void {

    const line = new TextLine(command, CommandType.userInput);
    line.data = sentence;

    this.addLine(line);
  }

  displayTitle(text: string): void {
    this.addLine(new TextLine(text, CommandType.header));
  }

  displaySubtitle(text: string): void {
    this.addLine(new TextLine(text, CommandType.subtitle));
  }

  displaySystem(text: string): void {
    this.addLine(new TextLine(text, CommandType.engine));
  }

  displayRoomName(text: string): void {
    this.addLine(new TextLine(text, CommandType.roomName));
  }

  displayStory(text: string): void {
    this.addLine(new TextLine(text, CommandType.narrative));
  }

  displayParserError(text: string): void {
    this.addLine(new TextLine(text, CommandType.parserError));
  }

  displayBlankLine(): void {
    this.addLine(new TextLine('', CommandType.divider));
  }

  clear(): void {
    this.logger.log('Clearing output area');
    this.lines.length = 0;
  }

  private addLine(line: TextLine): void {

    // Send the output to the console for good measure
    if (line && line.text && line.text.length > 0) {
      this.logger.log(`OUT: ${line.text}`);
    }

    // Update the collection. If components displaying this are bound to our lines collection, they'll update
    this.lines.push(line);

    // TODO: We may also need to fire an event here at some point

  }

}
