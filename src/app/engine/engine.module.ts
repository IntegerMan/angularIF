import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InteractiveFictionService} from './interactive-fiction.service';
import {TokenizerModule} from './parser/tokenizer.module';
import {TextOutputService} from './text-output.service';
import {UserInputService} from './user-input.service';
import {VerbsModule} from './verbs/verbs.module';
import {NavigationService} from './navigation.service';
import {ScoreService} from './score.service';
import {StateService} from './state.service';

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
    NavigationService,
    StateService,
    ScoreService
  ],
  declarations: []
})
export class EngineModule {}


