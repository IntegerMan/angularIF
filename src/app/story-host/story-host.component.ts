import {Component, OnDestroy, OnInit} from '@angular/core';
import {InteractiveFictionService} from '../engine/interactive-fiction.service';
import {Story} from '../engine/entities/story';
import {CommonVerbService} from '../engine/verbs/common-verb.service';
import {LoggingService} from '../utility/logging.service';
import {TextOutputService} from '../engine/text-output.service';
import {Subscription} from 'rxjs/Subscription';
import {ActivatedRoute, Params} from '@angular/router';
import {StoryService} from '../services/story.service';

@Component({
  selector: 'if-story-host',
  templateUrl: './story-host.component.html',
  styleUrls: ['./story-host.component.css']
})
export class StoryHostComponent implements OnInit, OnDestroy {

  public story: Story;
  public loading: boolean = true;
  private routerSubscription: Subscription;

  constructor(private outputService: TextOutputService,
              private logger: LoggingService,
              private route: ActivatedRoute,
              private ifService: InteractiveFictionService,
              private storyService: StoryService,
              private verbService: CommonVerbService) {

  }

  ngOnInit() {
    this.routerSubscription = this.route.params.subscribe(p => this.loadFromParameters(p));
  }

  ngOnDestroy(): void {

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

  }

  private loadFromParameters(p: Params | undefined) {

    LoggingService.instance.debug(`Loaded route parameters`);

    if (!p) {
      // TODO: Redirect to a not found route
      LoggingService.instance.warning(`No route parameters detected`);
      LoggingService.instance.debug(p);
      return;
    }

    const storyKey: string = p['key'];
    LoggingService.instance.debug(`Loading story with key ${storyKey}`);
    const story: Story = this.storyService.getStory(storyKey);

    if (!story) {
      // TODO: Redirect to a not found route
      LoggingService.instance.warning(`Story ${storyKey} could not be found.`);
      return;
    }

    LoggingService.instance.debug(`Loaded story ${story.name}`);

    // Import the common set of verbs
    for (const verb of this.verbService.getCommonVerbs()) {
      story.verbHandlers.push(verb);
    }

    this.story = story;
    this.loading = false;
  }

}
