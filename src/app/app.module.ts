import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { LoggingService } from './utility/logging.service';
import {TextOutputService} from './engine/text-output.service';
import {EngineModule} from './engine/engine.module';
import {GoogleAnalyticsService} from './utility/google-analytics.service';
import {RollbarErrorHandler, rollbarFactory, RollbarService} from './utility/rollbar-error-handler';
import {MarkdownService} from './text-rendering/markdown.service';
import {TemplatingService} from './engine/parser/templating.service';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import {StoryService} from './services/story.service';
import {EditorModule} from './editor/editor.module';
import {StoryHostModule} from './story-host/story-host.module';
import {StorySelectionComponent} from './story-selection/story-selection.component';
import {StoryHostComponent} from './story-host/story-host.component';
import {EditorHostComponent} from './editor/editor-host/editor-host.component';
import {StorySelectionModule} from './story-selection/story-selection.module';
import {CommonUIModule} from './common-ui/common-ui.module';

const appRoutes: Routes = [
  { path: 'Stories', component: StorySelectionComponent },
  { path: 'stories', component: StorySelectionComponent },
  { path: 'Stories/:key', component: StoryHostComponent },
  { path: 'stories/:key', component: StoryHostComponent },
  { path: 'Editor', component: EditorHostComponent },
  { path: 'editor', component: EditorHostComponent },
  { path: 'Editor/Import', component: EditorHostComponent },
  { path: 'Stories/:key/Source', component: EditorHostComponent },
  { path: 'stories/:key/source', component: EditorHostComponent },
  { path: '**',  redirectTo: 'Stories' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Base Angular Imports
    BrowserModule,
    BrowserAnimationsModule,
    // Custom imports can now come in
    CommonUIModule,
    EditorModule,
    StoryHostModule,
    StorySelectionModule,
    EngineModule,
    // Routing!!!
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: !environment.production }
    ),
  ],
  providers: [
    LoggingService,
    TextOutputService,
    GoogleAnalyticsService,
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory }
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
