import { TestBed, inject } from '@angular/core/testing';

import { EditorService } from './editor.service';
import {EditorModule} from './editor.module';
import {LoggingService} from '../utility/logging.service';
import {LexiconService} from '../engine/parser/lexicon.service';
import {NaturalLanguageService} from '../engine/parser/natural-language.service';

describe('EditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditorModule],
      providers: [ NaturalLanguageService, LexiconService, LoggingService]
    });
  });

  it('should be created', inject([EditorService], (service: EditorService) => {
    expect(service).toBeTruthy();
  }));
});
