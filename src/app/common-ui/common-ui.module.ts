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
    TreeModule
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
    TreeModule
  ],
  providers: [
    ConfirmationService
  ],
  declarations: [
    LoadingIndicatorComponent,
  ]
})
export class CommonUIModule { }
