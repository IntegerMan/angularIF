import {Component, OnDestroy, OnInit} from '@angular/core';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {TextOutputService} from '../../engine/text-output.service';
import {Subscription} from 'rxjs/Subscription';
import {TextLine} from '../text-line';
import {RenderType} from '../render-type.enum';
import {Command} from '../../engine/parser/command';
import {ScoreService} from '../../engine/score.service';

@Component({
  selector: 'if-game-state-header',
  templateUrl: './game-state-header.component.html',
  styleUrls: ['./game-state-header.component.css']
})
export class GameStateHeaderComponent implements OnInit, OnDestroy {

  mainText: string = 'Loading...';
  movesText: string = 'No Moves';
  score: number;
  maxScore: number;

  private lineAddedSubscription: Subscription;
  private commandSubscription: Subscription;

  constructor(private ifService: InteractiveFictionService,
              private output: TextOutputService,
              private scoreService: ScoreService) {

  }

  ngOnInit(): void {
    this.mainText = this.ifService.story.player.currentRoom.name;
    this.lineAddedSubscription = this.output.lineAdded.subscribe(l => this.handleLineAdded(l));
    this.commandSubscription = this.ifService.commandEvaluated.subscribe(c => this.handleCommand(c));

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

  private handleCommand(command: Command): void {

    // Update to the current moves taken count
    this.movesText = this.getMovesTakenText(this.ifService.movesTaken);

    // Rip the current score. We could listen to an event on that service, but it makes more sense just to listen to commands and reuse
    // an existing subscription
    this.score = this.scoreService.currentScore;
    this.maxScore = this.scoreService.maxScore;

  }
}
