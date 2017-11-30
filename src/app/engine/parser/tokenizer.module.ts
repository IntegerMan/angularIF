import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NaturalLanguageService} from './natural-language.service';
import {LexiconService} from './lexicon.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LexiconService,
    NaturalLanguageService
  ],
  declarations: []
})
export class TokenizerModule { }
