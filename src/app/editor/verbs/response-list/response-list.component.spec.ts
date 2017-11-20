import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseListComponent } from './response-list.component';
import {LoggingService} from '../../../utility/logging.service';
import {LexiconService} from '../../../engine/parser/lexicon.service';
import {EditorModule} from '../../editor.module';
import {NaturalLanguageService} from '../../../engine/parser/natural-language.service';

describe('ResponseListComponent', () => {
  let component: ResponseListComponent;
  let fixture: ComponentFixture<ResponseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule ],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
