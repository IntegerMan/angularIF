import { MarkdownPresenterComponent } from './markdown-presenter/markdown-presenter.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingIndicatorComponent} from './loading-indicator/loading-indicator.component';
import {
  MAT_PLACEHOLDER_GLOBAL_OPTIONS,
  MatDialogModule,
  MatCheckboxModule,
  MatExpansionModule, MatInputModule, MatRadioModule, MatSelectModule, MatToolbarModule, MatMenuModule,
  MatTooltipModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { EntitySortPipe } from './entity-sort.pipe';
import {TemplatingService} from '../engine/parser/templating.service';
import {MarkdownService} from '../text-rendering/markdown.service';
import { WarningComponent } from './warning/warning.component';
import {ConfirmService} from './confirm.service';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    RouterModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatCheckboxModule,
    EntitySortPipe,
    LoadingIndicatorComponent,
    MarkdownPresenterComponent,
    WarningComponent
  ],
  providers: [
    ConfirmService,
    MarkdownService,
    TemplatingService,
    {provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'always'}}
  ],
  declarations: [
    LoadingIndicatorComponent,
    MarkdownPresenterComponent,
    EntitySortPipe,
    WarningComponent
  ]
})
export class CommonUIModule { }
