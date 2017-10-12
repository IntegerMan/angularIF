import { Component } from '@angular/core';
import {InteractiveFictionService} from './interactive-fiction.service';
import {Story} from './story';
import {CloakStory} from './cloak-story';

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

    this.title = ifService.engineName;
  }

}
