import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TokenizerService} from './tokenizer.service';
import {NaturalLanguageService} from './natural-language.service';
import {InteractiveFictionService} from './interactive-fiction.service';
import {CommandParserService} from './command-parser.service';
import {LexiconService} from './lexicon.service';

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


