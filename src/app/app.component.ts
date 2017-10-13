import { Component } from '@angular/core';
import {InteractiveFictionService} from './engine/interactive-fiction.service';
import {Story} from './engine/story';
import {CloakStory} from './stories/cloak-of-darkness/cloak-story';

@Component({
  selector: 'if-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string;

  constructor(private ifService: InteractiveFictionService) {

    const story: Story = new CloakStory();
    ifService.initialize(story);

    this.title = story.title;
  }

}
