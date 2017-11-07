import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorHostComponent } from './editor-host/editor-host.component';
import {RouterModule, Routes} from '@angular/router';

const editRoutes: Routes = [
  { path: 'Editor', component: EditorHostComponent },
  { path: 'Stories/:key/Edit', component: EditorHostComponent },
  { path: 'stories/:key/edit', component: EditorHostComponent },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(editRoutes)
  ],
  declarations: [EditorHostComponent]
})
export class EditorModule {

}
