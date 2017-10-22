import {Component, Input, OnInit} from '@angular/core';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {ScoreService} from '../../engine/score.service';
import {StringHelper} from '../../utility/string-helper';

@Component({
  selector: 'if-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  @Input()
  text: string;

  @Input()
  isVictory: boolean;

  score: number;
  maxScore: number;
  movesText: string;

  constructor(private ifService: InteractiveFictionService,
              private scoreService: ScoreService) {

  }

  ngOnInit() {

    this.score = this.scoreService.currentScore;
    this.maxScore = this.scoreService.maxScore;
    this.movesText = StringHelper.pluralize(this.ifService.movesTaken, 'move', 'moves');

  }

}
