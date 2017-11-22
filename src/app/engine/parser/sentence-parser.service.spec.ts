import { TestBed, inject } from '@angular/core/testing';

import { SentenceParserService } from './sentence-parser.service';
import {TestingModule} from '../../testing/testing.module';

describe('SentenceParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ TestingModule ]
    });
  });

  it('should be created', inject([SentenceParserService], (service: SentenceParserService) => {
    expect(service).toBeTruthy();
  }));

});
