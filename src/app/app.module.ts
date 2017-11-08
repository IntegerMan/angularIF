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
import { StorySelectionComponent } from './story-selection/story-selection.component';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import {StoryService} from './engine/story.service';
import {EditorModule} from './editor/editor.module';
import {StoryHostModule} from './story-host/story-host.module';

const appRoutes: Routes = [
  { path: '**', component: StorySelectionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StorySelectionComponent,
  ],
  imports: [
    // Base Angular Imports
    BrowserModule,
    BrowserAnimationsModule,
    // Custom imports can now come in
    EditorModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: !environment.production }
    ),
    EngineModule,
    StoryHostModule
  ],
  providers: [
    LoggingService,
    TextOutputService,
    GoogleAnalyticsService,
    MarkdownService,
    TemplatingService,
    StoryService,
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory }
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
