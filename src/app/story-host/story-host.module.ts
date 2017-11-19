import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommandEntryService} from './command-entry.service';
import {CommandAreaComponent} from './command-area.component';
import {ParserCommandAreaComponent} from './parser-command-area.component';
import {GameStateHeaderComponent} from './game-state-header.component';
import {StoryContentComponent} from './story-content.component';
import {CommonUIModule} from '../common-ui/common-ui.module';
import {TokenComponent} from '../text-rendering/token/token.component';
import {SentenceDebugCardComponent} from '../text-rendering/sentence-debug-card/sentence-debug-card.component';
import {UserInputComponent} from '../text-rendering/user-input/user-input.component';
import {ParserErrorComponent} from '../text-rendering/parser-error/parser-error.component';
import {GameOverComponent} from '../text-rendering/game-over/game-over.component';
import {InlineHelpComponent} from '../text-rendering/inline-help/inline-help.component';
import {TextListComponent} from '../text-rendering/text-list/text-list.component';
import {EntityReferenceComponent} from '../text-rendering/entity-reference/entity-reference.component';
import {LineRendererComponent} from '../text-rendering/line-renderer/line-renderer.component';
import {TokenDebugComponent} from '../text-rendering/token-debug/token-debug.component';
import {EntityDebugComponent} from '../text-rendering/entity-debug/entity-debug.component';
import {KeyValuePairPipe} from '../utility/key-value-pair.pipe';
import {StoryHostComponent} from './story-host.component';

@NgModule({
  imports: [
    CommonModule,
    CommonUIModule
  ],
  declarations: [
    StoryHostComponent,
    KeyValuePairPipe,
    CommandAreaComponent,
    ParserCommandAreaComponent,
    GameStateHeaderComponent,
    StoryContentComponent,
    SentenceDebugCardComponent,
    LineRendererComponent,
    TokenComponent,
    UserInputComponent,
    TextListComponent,
    EntityReferenceComponent,
    GameOverComponent,
    ParserErrorComponent,
    InlineHelpComponent,
    TokenDebugComponent,
    EntityDebugComponent
  ],
  exports: [
    StoryContentComponent
  ],
  providers: [
    CommandEntryService
  ]
})
export class StoryHostModule { }
