import {EventEmitter, Injectable} from '@angular/core';
import {LoggingService} from '../utility/logging.service';
import {TextLine} from '../text-rendering/text-line';
import {CommandType} from '../text-rendering/command-type.enum';

@Injectable()
export class TextOutputService {

  lines: TextLine[] = [];
  linesChanged: EventEmitter<TextLine[]>;

  constructor(private logger: LoggingService) {
    this.linesChanged = new EventEmitter<TextLine[]>();
  }

  displayUserCommand(command: string, sentence: any): void {
    this.addLine(new TextLine(command, CommandType.userInput, sentence));
  }

  displayTitle(text: string, smallText: string): void {
    this.addLine(new TextLine(text, CommandType.header, smallText));
  }

  displaySubtitle(text: string): void {
    this.addLine(new TextLine(text, CommandType.subtitle));
  }

  displaySystem(text: string): void {
    this.addLine(new TextLine(text, CommandType.engine));
  }

  displayHelpText(text: string) {
    this.addLine(new TextLine(text, CommandType.helpText));
  }

  displayList(text: string, items: string[]) {
    this.addLine(new TextLine(text, CommandType.list, items));
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

  displayFailedAction(text: string): void {
    this.addLine(new TextLine(text, CommandType.failureAction));
  }

  displaySuccessAction(text: string): void {
    this.addLine(new TextLine(text, CommandType.successAction));
  }

  displayBlankLine(): void {
    this.addLine(new TextLine('', CommandType.divider));
  }

  clear(): void {
    this.logger.log('Clearing output area');
    this.lines.length = 0;

    this.linesChanged.emit(this.lines);
  }

  private addLine(line: TextLine): void {

    // Send the output to the console for good measure
    if (line && line.text && line.text.length > 0) {
      this.logger.log(`OUT: ${line.text}`);
    }

    // Update the collection. If components displaying this are bound to our lines collection, they'll update
    this.lines.push(line);

    this.linesChanged.emit(this.lines);

  }

}
