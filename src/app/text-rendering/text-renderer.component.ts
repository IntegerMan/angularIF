import { Component, OnInit } from '@angular/core';
import {TextOutputService} from './text-output.service';
import {LoggingService} from '../logging.service';
import {TextLine} from './text-line';
import {CommandType} from './command-type.enum';

@Component({
  selector: 'if-text-renderer',
  templateUrl: './text-renderer.component.html',
  styleUrls: ['./text-renderer.component.css']
})
export class TextRendererComponent implements OnInit {

  lines: TextLine[] = [];

  private _outputService: TextOutputService;
  private _logger: LoggingService;

  constructor(outputService: TextOutputService,
              logger: LoggingService) {
    this._outputService = outputService;
    this._logger = logger;
  }

  ngOnInit() {
    this._logger.log('TextRendererComponent initialized');
    this.lines = this._outputService.lines;
  }

  getHtmlForLine(line: TextLine): string {

    // <span class="{{line.classes}}">{{line.text}}</span><br />

    switch (line.commandType) {

      case CommandType.engine:
        return `<span class="text-secondary">${line.text}</span>`;

      case CommandType.narrative:
        return `<span class="text">${line.text}</span>`;

      case CommandType.header:
        return `<span class="lead">${line.text}</span>`;

      case CommandType.subHeader:
        return `<span class="text-info">${line.text}</span>`;

      case CommandType.userInput:
        return `<span class="text-secondary">&gt;</span> <kbd>${line.text}</kbd>`;

      case CommandType.divider:
        return `<p class="my-3">${line.text}</p>`;

      default:
        return line.text;
    }

  }

}
