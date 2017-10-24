import {Component, Input, OnInit} from '@angular/core';
import {Command} from '../../engine/parser/command';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'if-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent implements OnInit {

  @Input()
  text: string;

  @Input()
  command: Command;

  id: number;
  showDebugAids: boolean;

  constructor() {
    this.id = Math.floor(Math.random() * 100000);
    this.showDebugAids = environment.showDebugAids;
  }

  ngOnInit() {
  }

}
