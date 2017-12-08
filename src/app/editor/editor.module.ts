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
import { VerbsListComponent } from './verbs/verbs-list/verbs-list.component';
import { AttributesListComponent } from './attributes-list/attributes-list.component';
import { NavigationListComponent } from './navigation-list/navigation-list.component';
import { EventsListComponent } from './events-list/events-list.component';
import { VerbCardComponent } from './verbs/verb-card/verb-card.component';
import { ActorEditorComponent } from './actor-editor/actor-editor.component';
import { EditorSidebarComponent } from './editor-sidebar/editor-sidebar.component';
import { EditorService } from './editor.service';
import { EntityEditorComponent } from './entity-editor/entity-editor.component';
import { StringsListComponent } from './strings-list/strings-list.component';
import { ResponseListComponent } from './verbs/response-list/response-list.component';
import { EditorToolbarComponent } from './editor-toolbar/editor-toolbar.component';
import { JsonExportComponent } from './json-export/json-export.component';
import { AddAliasDialogComponent } from './dialogs/add-alias-dialog/add-alias-dialog.component';
import { EditorCardCommandsComponent } from './editor-card-commands/editor-card-commands.component';
import { AddEntityDialogComponent } from './dialogs/add-entity-dialog/add-entity-dialog.component';
import { LookRendererComponent } from './verbs/look-renderer/look-renderer.component';
import {StoryHostModule} from '../story-host/story-host.module';
import {AddAttributeDialogComponent} from './dialogs/add-attribute-dialog/add-attribute-dialog.component';
import { AddVerbHandlerDialogComponent } from './dialogs/add-verb-handler-dialog/add-verb-handler-dialog.component';
import { VerbEditorComponent } from './verbs/verb-editor/verb-editor.component';
import { AddVerbResponseDialogComponent } from './dialogs/add-verb-response-dialog/add-verb-response-dialog.component';
import { AddNavigationDialogComponent } from './dialogs/add-navigation-dialog/add-navigation-dialog.component';
import { NavigationEditorComponent } from './navigation-editor/navigation-editor.component';
import { EntitySectionHeaderComponent } from './entity-section-header/entity-section-header.component';

@NgModule({
  imports: [
    CommonModule,
    CommonUIModule,
    StoryHostModule
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
    JsonExportComponent,
    AddAliasDialogComponent,
    EditorCardCommandsComponent,
    AddEntityDialogComponent,
    LookRendererComponent,
    AddAttributeDialogComponent,
    AddVerbHandlerDialogComponent,
    VerbEditorComponent,
    AddVerbResponseDialogComponent,
    AddNavigationDialogComponent,
    NavigationEditorComponent,
    EntitySectionHeaderComponent
  ],
  entryComponents: [
    AddAliasDialogComponent,
    AddEntityDialogComponent,
    AddAttributeDialogComponent,
    AddVerbHandlerDialogComponent,
    AddVerbResponseDialogComponent,
    AddNavigationDialogComponent
  ]
})
export class EditorModule {

}
