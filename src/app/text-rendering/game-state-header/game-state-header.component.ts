import { Component, OnInit } from '@angular/core';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {Story} from '../../engine/entities/story';

@Component({
  selector: 'if-game-state-header',
  templateUrl: './game-state-header.component.html',
  styleUrls: ['./game-state-header.component.css']
})
export class GameStateHeaderComponent implements OnInit {

  private story: Story;

  constructor(private ifService: InteractiveFictionService) {

  }

  ngOnInit() {
    this.story = this.ifService.story;
  }

  getMovesTakenText(): string {

    const moves: number = this.story.movesTaken;

    if (moves === 1) {
      return '1 Move';
    } else {
      return `${moves} Moves`;
    }
  }

}
