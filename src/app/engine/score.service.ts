import { Injectable } from '@angular/core';

@Injectable()
export class ScoreService {

  currentScore: number = 0;
  maxScore: number = 0;

  constructor() {

  }

}
