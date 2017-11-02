import { Component, OnDestroy, OnInit, Input} from '@angular/core';
import {InteractiveFictionService} from '../engine/interactive-fiction.service';
import {TextOutputService} from '../engine/text-output.service';
import {Subscription} from 'rxjs/Subscription';
import {ScoreService} from '../engine/score.service';
import {TextLine} from '../text-rendering/text-line';
import {RenderType} from '../text-rendering/render-type.enum';

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
              private output: TextOutputService,
              private scoreService: ScoreService) {

  }

  ngOnInit(): void {
    this.mainText = this.ifService.story.player.currentRoom.name;

    this.lineAddedSubscription = this.output.lineAdded.subscribe(l => this.handleLineAdded(l));
    this.gameStateSubscription = this.ifService.gameStateChanged.subscribe(s => this.updateData());
    this.commandSubscription = this.ifService.commandEvaluated.subscribe(c => this.updateData());

    this.score = this.scoreService.currentScore;
    this.maxScore = this.scoreService.maxScore;
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
    this.movesText = this.getMovesTakenText(this.ifService.movesTaken);

    // Rip the current score. We could listen to an event on that service, but it makes more sense just to listen to commands and reuse
    // an existing subscription
    this.score = this.scoreService.currentScore;
    this.maxScore = this.scoreService.maxScore;

  }
}
