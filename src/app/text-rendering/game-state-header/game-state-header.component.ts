import {Component, OnDestroy, OnInit} from '@angular/core';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {Story} from '../../engine/entities/story';
import {TextOutputService} from '../../engine/text-output.service';
import {Subscription} from 'rxjs/Subscription';
import {TextLine} from '../text-line';
import {CommandType} from '../command-type.enum';

@Component({
  selector: 'if-game-state-header',
  templateUrl: './game-state-header.component.html',
  styleUrls: ['./game-state-header.component.css']
})
export class GameStateHeaderComponent implements OnInit, OnDestroy {

  mainText: string = 'Loading...';
  story: Story;
  private lineAddedSubscription: Subscription;

  constructor(private ifService: InteractiveFictionService,
              private output: TextOutputService) {

  }

  ngOnInit(): void {
    this.story = this.ifService.story;
    this.mainText = this.ifService.story.player.currentRoom.name;
    this.lineAddedSubscription = this.output.lineAdded.subscribe(l => this.handleLineAdded(l));
  }

  ngOnDestroy(): void {
    if (this.lineAddedSubscription) {
      this.lineAddedSubscription.unsubscribe();
    }
  }

  getMovesTakenText(): string {

    const moves: number = this.story.movesTaken;

    if (moves === 1) {
      return '1 Move';
    } else {
      return `${moves} Moves`;
    }
  }

  private handleLineAdded(line: TextLine): void {

    if (line.commandType === CommandType.roomName ||
        line.commandType === CommandType.header) {

      this.mainText = line.text;

    }

  }

}
