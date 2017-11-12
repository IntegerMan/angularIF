import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {VerbData} from "../../engine/story-data/verb-data";

@Component({
  selector: 'if-verb-card',
  templateUrl: './verb-card.component.html',
  styleUrls: ['./verb-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VerbCardComponent implements OnInit {

  @Input()
  verb: VerbData;

  constructor() { }

  ngOnInit() {
  }

  edit(): void {
    // TODO
  }

  delete(): void {
    // TODO
  }

}
