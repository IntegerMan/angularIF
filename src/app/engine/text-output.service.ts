import {EventEmitter, Injectable} from '@angular/core';
import {LoggingService} from '../utility/logging.service';
import {TextLine} from '../text-rendering/text-line';
import {RenderType} from '../text-rendering/render-type.enum';

@Injectable()
export class TextOutputService {

  lines: TextLine[] = [];
  linesChanged: EventEmitter<TextLine[]>;
  lineAdded: EventEmitter<TextLine>;

  constructor(private logger: LoggingService) {
    this.linesChanged = new EventEmitter<TextLine[]>();
    this.lineAdded = new EventEmitter<TextLine>();
  }

  displayUserCommand(command: string, sentence: any): void {
    this.addLine(new TextLine(command, RenderType.userInput, sentence));
  }

  displayTitle(text: string, smallText: string): void {
    this.addLine(new TextLine(text, RenderType.header, smallText));
  }

  displaySubtitle(text: string): void {
    this.addLine(new TextLine(text, RenderType.subtitle));
  }

  displaySystem(text: string): void {
    this.addLine(new TextLine(text, RenderType.engine));
  }

  displayHelpText(text: string) {
    this.addLine(new TextLine(text, RenderType.helpText));
  }

  displayList(text: string, items: string[]) {
    this.addLine(new TextLine(text, RenderType.list, items));
  }

  displayRoomName(text: string): void {
    this.addLine(new TextLine(text, RenderType.roomName));
  }

  displayStory(text: string): void {
    this.addLine(new TextLine(text, RenderType.narrative));
  }

  displayParserError(text: string): void {
    this.addLine(new TextLine(text, RenderType.parserError));
  }

  displayFailedAction(text: string): void {
    this.addLine(new TextLine(text, RenderType.failureAction));
  }

  displaySuccessAction(text: string): void {
    this.addLine(new TextLine(text, RenderType.successAction));
  }

  displayBlankLine(): void {
    this.addLine(new TextLine('', RenderType.divider));
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

    // Fire events
    this.lineAdded.emit(line);
    this.linesChanged.emit(this.lines);

  }

}
