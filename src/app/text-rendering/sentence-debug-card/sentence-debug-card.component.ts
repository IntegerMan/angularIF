import {Component, Input, OnInit} from '@angular/core';
import {Command} from '../../engine/tokenizer/command';

@Component({
  selector: 'if-sentence-debug-card',
  templateUrl: './sentence-debug-card.component.html',
  styleUrls: ['./sentence-debug-card.component.css']
})
export class SentenceDebugCardComponent implements OnInit {

  @Input()
  command: Command;

  constructor() { }

  ngOnInit() {
  }

}
