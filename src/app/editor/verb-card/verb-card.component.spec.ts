import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbCardComponent } from './verb-card.component';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';

describe('VerbCardComponent', () => {
  let component: VerbCardComponent;
  let fixture: ComponentFixture<VerbCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule ],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbCardComponent);
    component = fixture.componentInstance;
    component.verb = TestDataProvider.buildVerb();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
