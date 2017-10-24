import { Injectable } from '@angular/core';
import {TextOutputService} from './text-output.service';
import {StringHelper} from '../utility/string-helper';

@Injectable()
export class ScoreService {

  currentScore: number = 0;
  maxScore: number = 0;

  constructor(private output: TextOutputService) {

  }

  increaseScore(amount: number = 1): number {

    this.currentScore += amount;

    // Tell the user how awesome they're doing
    this.output.displayBlankLine();
    this.output.displaySuccessAction(`Your score has just gone up by ${StringHelper.pluralize(amount, 'point', 'points')}.`);

    return this.currentScore;

  }

  decreaseScore(amount: number = 1): number {

    this.currentScore += amount;

    // Tell the user how awesome they're doing
    this.output.displayBlankLine();
    this.output.displaySuccessAction(`Your score has just gone down by ${StringHelper.pluralize(amount, 'point', 'points')}.`);

    return this.currentScore;

  }

}
