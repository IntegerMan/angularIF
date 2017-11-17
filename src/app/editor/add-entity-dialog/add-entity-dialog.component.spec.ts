import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityDialogComponent } from './add-entity-dialog.component';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

describe('AddEntityDialogComponent', () => {
  let component: AddEntityDialogComponent;
  let fixture: ComponentFixture<AddEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule],
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
    fixture = TestBed.createComponent(AddEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
