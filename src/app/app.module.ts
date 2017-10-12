import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { TextRendererComponent } from './text-renderer/text-renderer.component';
import { CommandAreaComponent } from './command-area/command-area.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TagCommandAreaComponent } from './tag-command-area/tag-command-area.component';
import { ParserCommandAreaComponent } from './parser-command-area/parser-command-area.component';
import { LoggingService } from './logging.service';
import {TextOutputService} from './text-output.service';
import {CommandEntryService} from './command-entry.service';
import {InteractiveFictionService} from './interactive-fiction.service'; // this is needed!

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
  providers: [LoggingService, TextOutputService, CommandEntryService, InteractiveFictionService],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
