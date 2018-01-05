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
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {AddVerbHandlerDialogComponent} from '../editor/dialogs/add-verb-handler-dialog/add-verb-handler-dialog.component';
import {AddAliasDialogComponent} from '../editor/dialogs/add-alias-dialog/add-alias-dialog.component';
import {AddEntityDialogComponent} from '../editor/dialogs/add-entity-dialog/add-entity-dialog.component';
import {AddVerbResponseDialogComponent} from '../editor/dialogs/add-verb-response-dialog/add-verb-response-dialog.component';
import {AddAttributeDialogComponent} from '../editor/dialogs/add-attribute-dialog/add-attribute-dialog.component';
import {AddNavigationDialogComponent} from '../editor/dialogs/add-navigation-dialog/add-navigation-dialog.component';
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
    WarningComponent,
    ConfirmDialogComponent
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
    WarningComponent,
    ConfirmDialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class CommonUIModule { }
