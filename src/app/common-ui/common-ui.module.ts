import { MarkdownPresenterComponent } from './markdown-presenter/markdown-presenter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingIndicatorComponent} from './loading-indicator/loading-indicator.component';
import {
  MatDialogModule,
  MatExpansionModule, MatInputModule, MatSelectModule, MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {
  ConfirmDialogModule, ConfirmationService, TreeModule, DataTableModule, SharedModule
} from 'primeng/primeng';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    ConfirmDialogModule,
    TreeModule,
    RouterModule,
    DataTableModule,
    MatSelectModule,
    MatDialogModule,
    SharedModule
  ],
  exports: [
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatInputModule,
    LoadingIndicatorComponent,
    ConfirmDialogModule,
    TreeModule,
    RouterModule,
    MarkdownPresenterComponent,
    FormsModule,
    DataTableModule,
    MatSelectModule,
    MatDialogModule,
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
