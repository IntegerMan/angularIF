import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAliasDialogComponent } from './add-alias-dialog.component';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {CommonUIModule} from '../../common-ui/common-ui.module';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

describe('AddAliasDialogComponent', () => {
  let component: AddAliasDialogComponent;
  let fixture: ComponentFixture<AddAliasDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommonUIModule, EditorModule],
      providers: [
        NaturalLanguageService,
        LexiconService,
        LoggingService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAliasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
