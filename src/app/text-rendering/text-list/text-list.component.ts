import {Component, Input, OnInit} from '@angular/core';
import {StringHelper} from '../../utility/string-helper';

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

  getItemText(item: string): string {
    return StringHelper.capitalize(item);
  }

}
