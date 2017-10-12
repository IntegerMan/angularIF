import { Component } from '@angular/core';
import {InteractiveFictionService} from './interactive-fiction.service';

@Component({
  selector: 'if-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Interactive Fiction Engine';

  constructor(private ifService: InteractiveFictionService) {
    ifService.initialize();
  }

}
