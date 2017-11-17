import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookRendererComponent } from './look-renderer.component';
import {LoggingService} from '../../utility/logging.service';
import {LexiconService} from '../../engine/parser/lexicon.service';
import {EditorModule} from '../editor.module';
import {NaturalLanguageService} from '../../engine/parser/natural-language.service';
import {TestDataProvider} from '../../engine/story-data/test-data-provider';

describe('LookRendererComponent', () => {
  let component: LookRendererComponent;
  let fixture: ComponentFixture<LookRendererComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EditorModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookRendererComponent);
    component = fixture.componentInstance;
    component.entity = TestDataProvider.buildItem();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
