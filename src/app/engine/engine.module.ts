import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InteractiveFictionService} from './interactive-fiction.service';
import {TokenizerModule} from './parser/tokenizer.module';
import {TextOutputService} from './text-output.service';
import {UserInputService} from './user-input.service';
import {VerbsModule} from './verbs/verbs.module';
import {StoryService} from '../services/story.service';
import {NaturalLanguageService} from './parser/natural-language.service';

@NgModule({
  imports: [
    CommonModule,
    TokenizerModule,
    VerbsModule
  ],
  providers: [
    InteractiveFictionService,
    TextOutputService,
    UserInputService,
    StoryService,
    NaturalLanguageService
  ],
  declarations: []
})
export class EngineModule {}


