import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {LoggingService} from '../utility/logging.service';
import {TextLine} from '../text-rendering/text-line';
import {RenderType} from '../text-rendering/render-type.enum';
import {InteractiveFictionService} from './interactive-fiction.service';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class TextOutputService implements OnDestroy {

  lines: TextLine[] = [];
  lastLine: TextLine = null;
  linesChanged: EventEmitter<TextLine[]>;
  lineAdded: EventEmitter<TextLine>;

  private linesAddedSubscription: Subscription;
  private linesClearedSubscription: Subscription;

  constructor(ifService: InteractiveFictionService) {
    this.linesChanged = new EventEmitter<TextLine[]>();
    this.lineAdded = new EventEmitter<TextLine>();

    this.linesAddedSubscription = ifService.engine.linesAdded.subscribe(lines => this.addLines(lines));
    this.linesClearedSubscription = ifService.engine.clearOutputRequested.subscribe(() => this.clear());
  }

  ngOnDestroy(): void {

    if (this.linesAddedSubscription) {
      this.linesAddedSubscription.unsubscribe();
    }

    if (this.linesClearedSubscription) {
      this.linesClearedSubscription.unsubscribe();
    }

  }

  displaySystem(text: string): void {
    this.addLine(new TextLine(text, RenderType.engine));
  }

  displayBlankLine(): void {
    this.addLine(new TextLine('', RenderType.divider));
  }

  clear(): void {
    LoggingService.instance.debug('Clearing output area');
    this.lines.length = 0;

    this.linesChanged.emit(this.lines);
  }

  addLines(lines: TextLine[]): void {
    for (const l of lines) {
      this.addLine(l);
    }
  }

  addLine(line: TextLine): void {

    // Send the output to the console for good measure
    if (line && line.text && line.text.length > 0) {
      LoggingService.instance.log(`OUT: ${line.text}`);
    }

    // Update the collection. If components displaying this are bound to our lines collection, they'll update
    this.lines.push(line);
    this.lastLine = line;

    // Fire events
    this.lineAdded.emit(line);
    this.linesChanged.emit(this.lines);

  }

}
