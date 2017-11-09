import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingIndicatorComponent} from './loading-indicator/loading-indicator.component';
import {
  MatCardModule, MatExpansionModule, MatInputModule, MatProgressBarModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {
  ConfirmDialogModule, ConfirmationService, TreeModule, DataTableModule, SharedModule
} from 'primeng/primeng';
import {RouterModule} from '@angular/router';
import {MarkdownPresenterComponent} from '../utility/markdown-presenter/markdown-presenter.component';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatProgressBarModule,
    MatInputModule,
    ConfirmDialogModule,
    TreeModule,
    RouterModule,
    DataTableModule,
    SharedModule
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
    MarkdownPresenterComponent,
    FormsModule,
    DataTableModule,
    SharedModule
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
