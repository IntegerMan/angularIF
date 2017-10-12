import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'if-parser-command-area',
  templateUrl: './parser-command-area.component.html',
  styleUrls: ['./parser-command-area.component.css']
})
export class ParserCommandAreaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  parseInput(sentence: String) {

    console.log(`User typed in '${sentence}'`);

  }
}
