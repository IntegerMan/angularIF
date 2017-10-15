import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommonVerbService} from './common-verb.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CommonVerbService
  ],
  declarations: []
})
export class VerbsModule { }
