import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InteractiveFictionService} from './interactive-fiction.service';
import {CommandParserService} from './tokenizer/command-parser.service';
import {TokenizerModule} from './tokenizer/tokenizer.module';
import {TextOutputService} from './text-output.service';
import {UserInputService} from './user-input.service';
import {VerbsModule} from './verbs/verbs.module';

@NgModule({
  imports: [
    CommonModule,
    TokenizerModule,
    VerbsModule
  ],
  providers: [
    InteractiveFictionService,
    CommandParserService,
    TextOutputService,
    UserInputService
  ],
  declarations: []
})
export class EngineModule {}


