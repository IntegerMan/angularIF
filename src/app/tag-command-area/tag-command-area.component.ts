import {Component, OnInit, Output} from '@angular/core';
import {TagInputModule} from 'ngx-chips/index';

@Component({
  selector: 'if-tag-command-area',
  templateUrl: './tag-command-area.component.html',
  styleUrls: ['./tag-command-area.component.css']
})
export class TagCommandAreaComponent implements OnInit {

  tags: string[] = ['This', 'is', 'a', 'test'];

  constructor() { }

  ngOnInit() {
  }

}

TagInputModule.withDefaults({
  tagInput: {
    placeholder: 'What do you want to do?'
  }
});
