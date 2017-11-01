import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CommandAreaComponent } from './command-area/command-area.component';

import { TagCommandAreaComponent } from './command-area/tag-command-area/tag-command-area.component';
import { ParserCommandAreaComponent } from './command-area/parser-command-area/parser-command-area.component';
import { LoggingService } from './utility/logging.service';
import {TextOutputService} from './engine/text-output.service';
import {CommandEntryService} from './command-area/command-entry.service';
import {EngineModule} from './engine/engine.module';
import { SentenceDebugCardComponent } from './text-rendering/sentence-debug-card/sentence-debug-card.component';
import { LineRendererComponent } from './text-rendering/line-renderer/line-renderer.component';
import { TokenComponent } from './text-rendering/token/token.component';
import { UserInputComponent } from './text-rendering/user-input/user-input.component';
import { TextListComponent } from './text-rendering/text-list/text-list.component';
import { EntityReferenceComponent } from './text-rendering/entity-reference/entity-reference.component';
import {GoogleAnalyticsService} from './utility/google-analytics.service';
import {
  TooltipModule, InputTextModule, ConfirmDialogModule, ConfirmationService, TreeModule, CarouselModule
} from 'primeng/primeng';
import {RollbarErrorHandler, rollbarFactory, RollbarService} from './utility/rollbar-error-handler';
import { GameStateHeaderComponent } from './text-rendering/game-state-header/game-state-header.component';
import { GameOverComponent } from './text-rendering/game-over/game-over.component';
import { KeyValuePairPipe } from './utility/key-value-pair.pipe';
import { ParserErrorComponent } from './text-rendering/parser-error/parser-error.component';
import { InlineHelpComponent } from './text-rendering/inline-help/inline-help.component';
import { TokenDebugComponent } from './text-rendering/token-debug/token-debug.component';
import { EntityDebugComponent } from './text-rendering/entity-debug/entity-debug.component';
import {MarkdownService} from './text-rendering/markdown.service';
import {TemplatingService} from './engine/parser/templating.service';
import { StorySelectionComponent } from './story-selection/story-selection.component';
import { StoryContentComponent } from './story-content/story-content.component';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import { MarkdownPresenterComponent } from './utility/markdown-presenter/markdown-presenter.component';
import { StoryCardComponent } from './story-card/story-card.component';
import {StoryService} from './engine/story.service';
import { StoryHostComponent } from './story-host/story-host.component';

const appRoutes: Routes = [

  { path: 'stories/:key', component: StoryHostComponent },
  { path: '**', component: StorySelectionComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CommandAreaComponent,
    TagCommandAreaComponent,
    ParserCommandAreaComponent,
    SentenceDebugCardComponent,
    LineRendererComponent,
    TokenComponent,
    UserInputComponent,
    TextListComponent,
    EntityReferenceComponent,
    GameStateHeaderComponent,
    GameOverComponent,
    KeyValuePairPipe,
    ParserErrorComponent,
    InlineHelpComponent,
    TokenDebugComponent,
    EntityDebugComponent,
    StorySelectionComponent,
    StoryContentComponent,
    MarkdownPresenterComponent,
    StoryCardComponent,
    StoryHostComponent
  ],
  imports: [
    // Base Angular Imports
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: !environment.production }
    ),
    BrowserModule,
    BrowserAnimationsModule,
    // Custom imports can now come in
    EngineModule,
    // TODO: It'd be nice to have a separate module just for managing Angular Material modules
    // TODO: It'd be nice to have a separate module just for managing PrimeNG modules
    TooltipModule,
    InputTextModule,
    ConfirmDialogModule,
    TreeModule,
    CarouselModule
  ],
  providers: [
    LoggingService,
    TextOutputService,
    CommandEntryService,
    GoogleAnalyticsService,
    MarkdownService,
    TemplatingService,
    StoryService,
    // TODO: It'd be nice to have a separate module just for managing PrimeNG modules
    ConfirmationService,
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory }
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
