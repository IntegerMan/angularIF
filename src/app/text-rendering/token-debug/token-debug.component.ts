import {Component, Input, OnInit} from '@angular/core';
import {CommandToken} from '../../engine/parser/command-token';

@Component({
  selector: 'if-token-debug',
  templateUrl: './token-debug.component.html',
  styleUrls: ['./token-debug.component.css']
})
export class TokenDebugComponent implements OnInit {

  @Input()
  token: CommandToken;

  constructor() { }

  ngOnInit() {
  }

}
