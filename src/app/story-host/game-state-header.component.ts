import { Component, OnDestroy, OnInit, Input} from '@angular/core';
import {InteractiveFictionService} from '../engine/interactive-fiction.service';
import {TextOutputService} from '../engine/text-output.service';
import {Subscription} from 'rxjs/Subscription';
import {TextLine} from '../text-rendering/text-line';
import {RenderType} from '../text-rendering/render-type.enum';
import {InteractiveFictionEngine} from '../engine/interactive-fiction-engine';

@Component({
  selector: 'if-game-state-header',
  templateUrl: './game-state-header.component.html',
  styleUrls: ['./game-state-header.component.css']
})
export class GameStateHeaderComponent implements OnInit, OnDestroy {

  @Input()
  headerClass: string;

  mainText: string = 'Loading...';
  movesText: string = '';
  score: number;
  maxScore: number;

  private lineAddedSubscription: Subscription;
  private commandSubscription: Subscription;
  private gameStateSubscription: Subscription;

  constructor(private ifService: InteractiveFictionService,
              private output: TextOutputService) {

  }

  get engine(): InteractiveFictionEngine {
    return this.ifService.engine;
  }

  ngOnInit(): void {

    const story = this.engine.story;

    if (story) {
      this.mainText = story.player.currentRoom.name;
    }

    this.lineAddedSubscription = this.output.lineAdded.subscribe(l => this.handleLineAdded(l));
    this.gameStateSubscription = this.engine.gameStateChanged.subscribe(s => this.updateData());
    this.commandSubscription = this.engine.commandEvaluated.subscribe(c => this.updateData());

    this.score = this.engine.currentScore;
    this.maxScore = this.engine.maxScore;
  }

  ngOnDestroy(): void {
    if (this.lineAddedSubscription) {
      this.lineAddedSubscription.unsubscribe();
    }
    if (this.commandSubscription) {
      this.commandSubscription.unsubscribe();
    }
    if (this.gameStateSubscription) {
      this.gameStateSubscription.unsubscribe();
    }
  }

  private getMovesTakenText(moves: number): string {
    if (moves === 1) {
      return '1 Move';
    } else {
      return `${moves} Moves`;
    }
  }

  private handleLineAdded(line: TextLine): void {

    if (line.commandType === RenderType.roomName ||
        line.commandType === RenderType.header) {
      this.mainText = line.text;
    }

  }

  private updateData(): void {

    // Update to the current moves taken count
    this.movesText = this.getMovesTakenText(this.engine.movesTaken);

    // Rip the current score. We could listen to an event on that service, but it makes more sense just to listen to commands and reuse
    // an existing subscription
    this.score = this.engine.currentScore;
    this.maxScore = this.engine.maxScore;

  }
}
