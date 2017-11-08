import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonUIModule} from '../common-ui/common-ui.module';
import {EditorHostComponent} from './editor-host/editor-host.component';
import { EditorTreeComponent } from './editor-tree/editor-tree.component';

@NgModule({
  imports: [
    CommonModule,
    CommonUIModule
  ],
  declarations: [
    EditorHostComponent,
    EditorTreeComponent
  ]
})
export class EditorModule {

}
