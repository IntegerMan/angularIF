import { Injectable } from '@angular/core';
import {TextOutputService} from './text-output.service';

@Injectable()
export class ScoreService {

  currentScore: number = 0;
  maxScore: number = 0;

  constructor(private output: TextOutputService) {

  }

  increaseScore(amount: number): number {

    this.currentScore += amount;

    // Tell the user how awesome they're doing
    this.output.displayBlankLine();
    this.output.displaySuccessAction(`Your score has gone up by ${amount}.`);

    return this.currentScore;

  }

  decreaseScore(amount: number): number {

    this.currentScore += amount;

    // Tell the user how awesome they're doing
    this.output.displayBlankLine();
    this.output.displayFailedAction(`Your score has gone down by ${amount}.`);

    return this.currentScore;

  }

}
