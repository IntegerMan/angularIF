import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'if-inline-help',
  templateUrl: './inline-help.component.html',
  styleUrls: ['./inline-help.component.css']
})
export class InlineHelpComponent implements OnInit {

  @Input()
  text: string;

  constructor() { }

  ngOnInit() {
  }

}
