import { Component } from '@angular/core';
import {InteractiveFictionService} from './engine/interactive-fiction.service';
import {Story} from './engine/entities/story';
import {CloakStory} from './stories/cloak-of-darkness/cloak-story';
import {CommonVerbService} from './engine/verbs/common-verb.service';
import {NavigationService} from './engine/navigation.service';
import {LoggingService} from './utility/logging.service';

@Component({
  selector: 'if-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title: string;

  constructor(private ifService: InteractiveFictionService,
              private navService: NavigationService,
              private logger: LoggingService,
              private verbService: CommonVerbService) {

    const story: Story = new CloakStory(navService, logger);

    // Import the common set of verbs
    for (const verb of this.verbService.getCommonVerbs()) {
      story.verbHandlers.push(verb);
    }

    ifService.initialize(story);

    this.title = story.title;
  }

}
