import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorEditorComponent } from './actor-editor.component';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {LoggingService} from '../../utility/logging.service';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('ActorEditorComponent', () => {
  let component: ActorEditorComponent;
  let fixture: ComponentFixture<ActorEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule, NoopAnimationsModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActorEditorComponent);
    component = fixture.componentInstance;
    component.story = TestDataProvider.buildStoryData();
    component.actor = TestDataProvider.buildActor();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
