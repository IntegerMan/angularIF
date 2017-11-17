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
import { EntitySortPipe } from './entity-sort.pipe';
import {TemplatingService} from '../engine/parser/templating.service';
import {MarkdownService} from '../text-rendering/markdown.service';
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
    SharedModule,
    EntitySortPipe
  ],
  providers: [
    ConfirmationService,
    MarkdownService,
    TemplatingService
  ],
  declarations: [
    LoadingIndicatorComponent,
    MarkdownPresenterComponent,
    EntitySortPipe
  ]
})
export class CommonUIModule { }
