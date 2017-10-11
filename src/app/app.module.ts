import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { TextRendererComponent } from './text-renderer/text-renderer.component';
import { CommandAreaComponent } from './command-area/command-area.component';
import { TagCommandAreaComponent } from './tag-command-area/tag-command-area.component';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!

@NgModule({
  declarations: [
    AppComponent,
    TextRendererComponent,
    CommandAreaComponent,
    TagCommandAreaComponent,
  ],
  imports: [
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
