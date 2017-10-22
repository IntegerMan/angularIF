import {AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {InteractiveFictionService} from './engine/interactive-fiction.service';
import {Story} from './engine/entities/story';
import {CloakStory} from './stories/cloak-of-darkness/cloak-story';
import {CommonVerbService} from './engine/verbs/common-verb.service';
import {NavigationService} from './engine/navigation.service';
import {LoggingService} from './utility/logging.service';
import {TextLine} from './text-rendering/text-line';
import {TextOutputService} from './engine/text-output.service';
import {Subscription} from 'rxjs/Subscription';
import {GameState} from './engine/game-state.enum';

@Component({
  selector: 'if-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked {

  lines: TextLine[] = [];
  title: string;
  stateClass: string = 'bg-warning';
  icon: string = 'fa-book';

  @ViewChild('scrollMe') private scrollContainer: ElementRef;

  private gameStateSubscription: Subscription;
  private linesChangedSubscription: Subscription;
  private respondToNextViewChecked: boolean = true;
  private gameState: GameState = GameState.initializing;

  ngOnInit() {
    this.lines = this.outputService.lines;
    this.gameStateSubscription = this.ifService.gameStateChanged.subscribe((s) => this.onGameStateChanged(s));
    this.linesChangedSubscription = this.outputService.linesChanged.subscribe(() => this.onLinesChanged());
    this.scrollToBottom();
    this.onGameStateChanged(this.ifService.gameState);
  }

  ngOnDestroy(): void {

    if (this.linesChangedSubscription) {
      this.linesChangedSubscription.unsubscribe();
    }

    if (this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    }

  }

  ngAfterViewChecked(): void {

    if (this.respondToNextViewChecked) {
      this.respondToNextViewChecked = false;
      this.scrollToBottom();
    }

  }

  scrollToBottom(): void {
    try {
      LoggingService.instance.log('Scrolling to bottom');

      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) {
      LoggingService.instance.error(err);
    }
  }

  constructor(private outputService: TextOutputService,
              private logger: LoggingService,
              private ifService: InteractiveFictionService,
              private navService: NavigationService,
              private verbService: CommonVerbService) {

    const story: Story = new CloakStory(navService, logger);

    // Import the common set of verbs
    for (const verb of this.verbService.getCommonVerbs()) {
      story.verbHandlers.push(verb);
    }

    ifService.initialize(story);

    this.title = story.title;
    this.icon = story.fontAwesomeIcon;
  }

  private onLinesChanged(): void {
    this.respondToNextViewChecked = true;
  }

  private onGameStateChanged(state: GameState): void {

    LoggingService.instance.debug(`Game state is now ${state}`);

    this.gameState = state;

    switch (state) {
      case GameState.underway:
        this.stateClass = 'bg-primary';
        break;

      case GameState.won:
        this.stateClass = 'bg-success';
        break;

      case GameState.lost:
        this.stateClass = 'bg-danger';
        break;

      default:
        this.stateClass = 'bg-warning';
        break;
    }
  }

}
