import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { TextRendererComponent } from './text-rendering/text-renderer.component';
import { CommandAreaComponent } from './command-area/command-area.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagCommandAreaComponent } from './command-area/tag-command-area/tag-command-area.component';
import { ParserCommandAreaComponent } from './command-area/parser-command-area/parser-command-area.component';
import { LoggingService } from './logging.service';
import {TextOutputService} from './text-rendering/text-output.service';
import {CommandEntryService} from './command-area/command-entry.service';
import {InteractiveFictionService} from './engine/interactive-fiction.service';
import {TokenizerService} from './engine/tokenizer.service';
import {CommandParserService} from './engine/command-parser.service';
import {LexiconService} from './engine/lexicon.service';
import {NaturalLanguageService} from './engine/natural-language.service'; // this is needed!

@NgModule({
  declarations: [
    AppComponent,
    TextRendererComponent,
    CommandAreaComponent,
    TagCommandAreaComponent,
    ParserCommandAreaComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [
    LoggingService,
    TextOutputService,
    CommandEntryService,
    InteractiveFictionService,
    TokenizerService,
    CommandParserService,
    LexiconService,
    NaturalLanguageService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
