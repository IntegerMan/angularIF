import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TokenizerService} from './tokenizer/tokenizer.service';
import {NaturalLanguageService} from './tokenizer/natural-language.service';
import {InteractiveFictionService} from './interactive-fiction.service';
import {CommandParserService} from './command-parser.service';
import {LexiconService} from './tokenizer/lexicon.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    InteractiveFictionService,
    TokenizerService,
    CommandParserService,
    LexiconService,
    NaturalLanguageService
  ],
  declarations: []
})
export class EngineModule {}


