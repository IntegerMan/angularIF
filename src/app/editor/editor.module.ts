import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonUIModule} from '../common-ui/common-ui.module';
import {EditorHostComponent} from './editor-host/editor-host.component';
import { EditorRendererComponent } from './editor-renderer/editor-renderer.component';
import { StoryInfoEditorComponent } from './story-info-editor/story-info-editor.component';
import { EditorImportComponent } from './editor-import/editor-import.component';
import { RoomEditorComponent } from './room-editor/room-editor.component';
import { AliasesListComponent } from './aliases-list/aliases-list.component';
import { ContentsListComponent } from './contents-list/contents-list.component';
import { VerbsListComponent } from './verbs-list/verbs-list.component';
import { AttributesListComponent } from './attributes-list/attributes-list.component';
import { NavigationListComponent } from './navigation-list/navigation-list.component';
import { EventsListComponent } from './events-list/events-list.component';
import { VerbCardComponent } from './verb-card/verb-card.component';
import { ActorEditorComponent } from './actor-editor/actor-editor.component';
import { EditorSidebarComponent } from './editor-sidebar/editor-sidebar.component';
import { EditorService } from './editor.service';
import { EntityEditorComponent } from './entity-editor/entity-editor.component';
import { StringsListComponent } from './strings-list/strings-list.component';
import { ResponseListComponent } from './response-list/response-list.component';
import { EditorToolbarComponent } from './editor-toolbar/editor-toolbar.component';
import { JsonExportComponent } from './json-export/json-export.component';

@NgModule({
  imports: [
    CommonModule,
    CommonUIModule
  ],
  providers: [
    EditorService
  ],
  declarations: [
    EditorHostComponent,
    EditorRendererComponent,
    StoryInfoEditorComponent,
    EditorImportComponent,
    RoomEditorComponent,
    AliasesListComponent,
    ContentsListComponent,
    VerbsListComponent,
    AttributesListComponent,
    NavigationListComponent,
    EventsListComponent,
    VerbCardComponent,
    ActorEditorComponent,
    EditorSidebarComponent,
    EntityEditorComponent,
    StringsListComponent,
    ResponseListComponent,
    EditorToolbarComponent,
    JsonExportComponent
  ]
})
export class EditorModule {

}
