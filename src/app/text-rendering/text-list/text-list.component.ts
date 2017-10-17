import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'if-text-list',
  templateUrl: './text-list.component.html',
  styleUrls: ['./text-list.component.css']
})
export class TextListComponent implements OnInit {

  @Input()
  text: string;

  @Input()
  items: string[];

  constructor() { }

  ngOnInit() {
  }

}
