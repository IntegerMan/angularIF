import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TextRendererComponent } from './text-renderer/text-renderer.component';
import { CommandAreaComponent } from './command-area/command-area.component';
import { TagCommandAreaComponent } from './tag-command-area/tag-command-area.component';

@NgModule({
  declarations: [
    AppComponent,
    TextRendererComponent,
    CommandAreaComponent,
    TagCommandAreaComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
