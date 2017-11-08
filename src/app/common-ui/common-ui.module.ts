import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingIndicatorComponent} from './loading-indicator/loading-indicator.component';
import {
  MatCardModule, MatExpansionModule, MatInputModule, MatProgressBarModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {
  ConfirmDialogModule, ConfirmationService, TreeModule
} from 'primeng/primeng';
import {RouterModule} from '@angular/router';
import {MarkdownPresenterComponent} from '../utility/markdown-presenter/markdown-presenter.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatInputModule,
    ConfirmDialogModule,
    TreeModule,
    RouterModule
  ],
  exports: [
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatInputModule,
    LoadingIndicatorComponent,
    ConfirmDialogModule,
    TreeModule,
    RouterModule,
    MarkdownPresenterComponent
  ],
  providers: [
    ConfirmationService
  ],
  declarations: [
    LoadingIndicatorComponent,
    MarkdownPresenterComponent
  ]
})
export class CommonUIModule { }
