import { NgModule } from '@angular/core';
import {LoggingService} from '../utility/logging.service';
import {StoryHostModule} from '../story-host/story-host.module';
import {LexiconService} from '../engine/parser/lexicon.service';
import {EngineModule} from '../engine/engine.module';
import {InteractiveFictionService} from '../engine/interactive-fiction.service';
import {GoogleAnalyticsService} from '../utility/google-analytics.service';
import {NaturalLanguageService} from '../engine/parser/natural-language.service';
import {RouterTestingModule} from '@angular/router/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {EditorModule} from '../editor/editor.module';
import {StoryTestingService} from './story-testing.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@NgModule({
  imports: [
    StoryHostModule,
    EngineModule,
    EditorModule,
    RouterTestingModule,
    NoopAnimationsModule
  ],
  providers: [
    NaturalLanguageService,
    LexiconService,
    LoggingService,
    InteractiveFictionService,
    GoogleAnalyticsService,
    StoryTestingService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ]
})
export class TestingModule { }
