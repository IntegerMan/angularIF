import {Component, Input, OnInit} from '@angular/core';
import {Command} from '../../engine/parser/command';

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

  constructor() {
    this.id = Math.floor(Math.random() * 100000);
  }

  ngOnInit() {
  }

}
