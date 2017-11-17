import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StringsListComponent } from './strings-list.component';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';

describe('StringsListComponent', () => {
  let component: StringsListComponent;
  let fixture: ComponentFixture<StringsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule ],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StringsListComponent);
    component = fixture.componentInstance;
    component.story = TestDataProvider.buildStory();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
