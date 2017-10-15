import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InteractiveFictionService} from './interactive-fiction.service';
import {CommandParserService} from './command-parser.service';
import {TokenizerModule} from './tokenizer/tokenizer.module';
import {TextOutputService} from './text-output.service';

@NgModule({
  imports: [
    CommonModule,
    TokenizerModule
  ],
  providers: [
    InteractiveFictionService,
    CommandParserService,
    TextOutputService
  ],
  declarations: []
})
export class EngineModule {}


