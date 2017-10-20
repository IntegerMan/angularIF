import {Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from '@angular/core';
import {TextOutputService} from '../engine/text-output.service';
import {LoggingService} from '../logging.service';
import {TextLine} from './text-line';
import {CommandType} from './command-type.enum';
import {CommandToken} from '../engine/parser/command-token';
import {TokenClassification} from '../engine/parser/token-classification.enum';
import {Command} from '../engine/parser/command';

@Component({
  selector: 'if-text-renderer',
  templateUrl: './text-renderer.component.html',
  styleUrls: ['./text-renderer.component.css']
})
export class TextRendererComponent implements OnInit {

  lines: TextLine[] = [];

  constructor(private outputService: TextOutputService,
              private logger: LoggingService) {
  }

  ngOnInit() {
    this.logger.log('TextRendererComponent initialized');
    this.lines = this.outputService.lines;
  }

}
