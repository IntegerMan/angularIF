import {Component, OnInit} from '@angular/core';
import {CommandEntryService} from '../../command-entry.service';

@Component({
  selector: 'if-parser-command-area',
  templateUrl: './parser-command-area.component.html',
  styleUrls: ['./parser-command-area.component.css']
})

export class ParserCommandAreaComponent implements OnInit {

  private _commandService: CommandEntryService;

  constructor(commandService: CommandEntryService) {
    this._commandService = commandService;

  }

  ngOnInit() {
  }

  parseInput(sentence: string) {

    this._commandService.parseInput(sentence);

  }
}
