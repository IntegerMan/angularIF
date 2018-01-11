import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorRendererComponent } from './editor-renderer.component';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';

describe('EditorRendererComponent', () => {
  let component: EditorRendererComponent;
  let fixture: ComponentFixture<EditorRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorRendererComponent);
    component = fixture.componentInstance;
    component.story = TestDataProvider.buildStoryData();
    component.node = TestDataProvider.buildActor();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
