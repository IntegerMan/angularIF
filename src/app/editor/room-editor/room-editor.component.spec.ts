import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEditorComponent } from './room-editor.component';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';

describe('RoomEditorComponent', () => {
  let component: RoomEditorComponent;
  let fixture: ComponentFixture<RoomEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule ],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomEditorComponent);
    component = fixture.componentInstance;
    component.room = TestDataProvider.buildRoom();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
