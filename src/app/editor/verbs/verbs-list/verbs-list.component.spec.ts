import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbsListComponent } from './verbs-list.component';
import {LoggingService} from '../../../utility/logging.service';
import {LexiconService} from '../../../engine/parser/lexicon.service';
import {EditorModule} from '../../editor.module';
import {NaturalLanguageService} from '../../../engine/parser/natural-language.service';
import {TestDataProvider} from '../../../engine/story-data/test-data-provider';

describe('VerbsListComponent', () => {
  let component: VerbsListComponent;
  let fixture: ComponentFixture<VerbsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule ],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbsListComponent);
    component = fixture.componentInstance;
    component.entity = TestDataProvider.buildRoom();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
