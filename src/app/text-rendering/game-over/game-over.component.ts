import {Component, Input, OnInit} from '@angular/core';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
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

  constructor(private ifService: InteractiveFictionService) {

  }

  ngOnInit() {

    const engine = this.ifService.engine;

    this.score = engine.currentScore;
    this.maxScore = engine.maxScore;
    this.movesText = StringHelper.pluralize(engine.movesTaken, 'move', 'moves');

  }

}
