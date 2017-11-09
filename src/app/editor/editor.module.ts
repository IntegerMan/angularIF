import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonUIModule} from '../common-ui/common-ui.module';
import {EditorHostComponent} from './editor-host/editor-host.component';
import { EditorTreeComponent } from './editor-tree/editor-tree.component';
import { EditorRendererComponent } from './editor-renderer/editor-renderer.component';
import { StoryInfoEditorComponent } from './story-info-editor/story-info-editor.component';
import { EditorImportComponent } from './editor-import/editor-import.component';
import { RoomListEditorComponent } from './room-list-editor/room-list-editor.component';
import { RoomEditorComponent } from './room-editor/room-editor.component';
import { AliasesListComponent } from './aliases-list/aliases-list.component';
import { ContentsListComponent } from './contents-list/contents-list.component';
import { VerbsListComponent } from './verbs-list/verbs-list.component';
import { AttributesListComponent } from './attributes-list/attributes-list.component';
import { NavigationListComponent } from './navigation-list/navigation-list.component';

@NgModule({
  imports: [
    CommonModule,
    CommonUIModule
  ],
  declarations: [
    EditorHostComponent,
    EditorTreeComponent,
    EditorRendererComponent,
    StoryInfoEditorComponent,
    EditorImportComponent,
    RoomListEditorComponent,
    RoomEditorComponent,
    AliasesListComponent,
    ContentsListComponent,
    VerbsListComponent,
    AttributesListComponent,
    NavigationListComponent
  ]
})
export class EditorModule {

}
