import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityDialogComponent } from './add-entity-dialog.component';
import {CommonUIModule} from '../../common-ui/common-ui.module';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';

describe('AddEntityDialogComponent', () => {
  let component: AddEntityDialogComponent;
  let fixture: ComponentFixture<AddEntityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
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
