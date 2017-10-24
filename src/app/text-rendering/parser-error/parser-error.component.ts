import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'if-parser-error',
  templateUrl: './parser-error.component.html',
  styleUrls: ['./parser-error.component.css']
})
export class ParserErrorComponent implements OnInit {

  @Input()
  text: string;

  @Input()
  hint: string;

  constructor() { }

  ngOnInit() {
  }

}
