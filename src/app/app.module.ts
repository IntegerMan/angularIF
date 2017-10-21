import { BrowserModule } from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler} from '@angular/core';

import { AppComponent } from './app.component';
import { TextRendererComponent } from './text-rendering/text-renderer.component';
import { CommandAreaComponent } from './command-area/command-area.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

import {RollbarErrorHandler, rollbarFactory, RollbarService} from './utility/rollbar-error-handler';

@NgModule({
  declarations: [
    AppComponent,
    TextRendererComponent,
    CommandAreaComponent,
    TagCommandAreaComponent,
    ParserCommandAreaComponent,
    SentenceDebugCardComponent,
    LineRendererComponent,
    TokenComponent,
    UserInputComponent,
    TextListComponent,
    EntityReferenceComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    EngineModule
  ],
  providers: [
    LoggingService,
    TextOutputService,
    CommandEntryService,
    GoogleAnalyticsService,
    { provide: ErrorHandler, useClass: RollbarErrorHandler },
    { provide: RollbarService, useFactory: rollbarFactory }
    ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
