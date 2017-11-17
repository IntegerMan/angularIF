import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentsListComponent } from './contents-list.component';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';

describe('ContentsListComponent', () => {
  let component: ContentsListComponent;
  let fixture: ComponentFixture<ContentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentsListComponent);
    component = fixture.componentInstance;
    component.entity = TestDataProvider.buildActor();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
