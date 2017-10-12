import {Component, OnInit} from '@angular/core';
import {CommandEntryService} from '../command-entry.service';

@Component({
  selector: 'if-parser-command-area',
  templateUrl: './parser-command-area.component.html',
  styleUrls: ['./parser-command-area.component.css'],
  providers: [CommandEntryService]
})

export class ParserCommandAreaComponent implements OnInit {

  constructor(commandService: CommandEntryService) {

  }

  ngOnInit() {
  }

  parseInput(sentence: String) {

    this.commandService.parseInput(sentence);

  }
}
