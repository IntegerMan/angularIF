import { Component, OnInit } from '@angular/core';
import {TextOutputService} from './text-output.service';
import {LoggingService} from '../logging.service';
import {TextLine} from './text-line';

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

}
