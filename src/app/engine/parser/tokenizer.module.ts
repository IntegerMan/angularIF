import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TokenizerService} from './tokenizer.service';
import {NaturalLanguageService} from './natural-language.service';
import {LexiconService} from './lexicon.service';
import {SentenceParserService} from './sentence-parser.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TokenizerService,
    LexiconService,
    NaturalLanguageService,
    SentenceParserService
  ],
  declarations: []
})
export class TokenizerModule { }
