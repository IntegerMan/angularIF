import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoryCardComponent} from './story-card.component';
import {CommonUIModule} from '../common-ui/common-ui.module';
import {StorySelectionComponent} from './story-selection.component';

@NgModule({
  imports: [
    CommonModule,
    CommonUIModule
  ],
  declarations: [
    StorySelectionComponent,
    StoryCardComponent
  ],
  exports: [
    StoryCardComponent
  ]
})
export class StorySelectionModule { }
