import { Injectable } from '@angular/core';
import {StringHelper} from '../utility/string-helper';
import {CommandContext} from './command-context';

@Injectable()
export class ScoreService {

  currentScore: number = 0;
  maxScore: number = 0;

  increaseScore(context: CommandContext, amount: number = 1): number {

    this.currentScore += amount;

    // Tell the user how awesome they're doing
    context.output.addBlankLine();
    context.output.addSuccessAction(`Your score has just gone up by ${StringHelper.pluralize(amount, 'point', 'points')}.`);

    return this.currentScore;

  }

  decreaseScore(context: CommandContext, amount: number = 1): number {

    this.currentScore += amount;

    // Tell the user how awesome they're doing
    context.output.addBlankLine();
    context.output.addSuccessAction(`Your score has just gone down by ${StringHelper.pluralize(amount, 'point', 'points')}.`);

    return this.currentScore;

  }

}
