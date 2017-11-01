import { Component, OnInit } from '@angular/core';
import {Story} from '../engine/entities/story';
import {StoryService} from '../engine/story.service';

@Component({
  selector: 'if-story-selection',
  templateUrl: './story-selection.component.html',
  styleUrls: ['./story-selection.component.css']
})
export class StorySelectionComponent implements OnInit {

  // TODO: Probably should be working with StoryInfo objects here
  public stories: Story[] = [];

  constructor(private storyService: StoryService) {

  }

  ngOnInit(): void {
    this.stories = this.storyService.getStories();
  }

}
