import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NaturalLanguageService} from './natural-language.service';
import {LexiconService} from './lexicon.service';
import {SentenceParserService} from './sentence-parser.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LexiconService,
    NaturalLanguageService,
    SentenceParserService
  ],
  declarations: []
})
export class TokenizerModule { }
