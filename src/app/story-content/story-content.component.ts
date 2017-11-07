import {AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {InteractiveFictionService} from '../engine/interactive-fiction.service';
import {Story} from '../engine/entities/story';
import {LoggingService} from '../utility/logging.service';
import {TextLine} from '../text-rendering/text-line';
import {TextOutputService} from '../engine/text-output.service';
import {Subscription} from 'rxjs/Subscription';
import {GameState} from '../engine/game-state.enum';

@Component({
  selector: 'if-story',
  templateUrl: './story-content.component.html',
  styleUrls: ['./story-content.component.css']
})
export class StoryContentComponent implements OnInit, OnDestroy, AfterViewChecked {

  @Input()
  story: Story;

  lines: TextLine[] = [];
  title: string;
  stateClass: string = 'bg-warning';
  icon: string = 'fa-book';
  storyCardHeight: number;

  @ViewChild('StoryCard') private storyCard: ElementRef;
  @ViewChild('scrollMe') private scrollContainer: ElementRef;

  private gameStateSubscription: Subscription;
  private linesChangedSubscription: Subscription;
  private respondToNextViewChecked: boolean = true;
  private gameState: GameState = GameState.initializing;

  constructor(private outputService: TextOutputService,
              private logger: LoggingService,
              private ifService: InteractiveFictionService) {

    this.onResize();

  }

  ngOnInit() {

    this.ifService.initialize(this.story);

    this.title = this.story.name;
    this.icon = this.story.fontAwesomeIcon;

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

  onResize(): void {
    this.storyCardHeight = window.innerHeight - 250;
  }

  private onLinesChanged(): void {
    this.respondToNextViewChecked = true;
  }

  private onGameStateChanged(state: GameState): void {

    LoggingService.instance.debug(`Game state is now ${state}`);

    this.gameState = state;

    switch (state) {
      case GameState.underway:
        this.stateClass = 'accent-bg';
        break;

      case GameState.won:
        this.stateClass = 'green accent-3';
        break;

      case GameState.lost:
        this.stateClass = 'red darken-3';
        break;

      default:
        this.stateClass = 'grey';
        break;
    }
  }

}
