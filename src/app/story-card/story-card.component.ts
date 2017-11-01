import {Component, Input, OnInit} from '@angular/core';
import {Story} from '../engine/entities/story';

@Component({
  selector: 'if-story-card',
  templateUrl: './story-card.component.html',
  styleUrls: ['./story-card.component.css']
})
export class StoryCardComponent implements OnInit {

  @Input()
  story: Story;

  constructor() { }

  ngOnInit() {
  }

}
