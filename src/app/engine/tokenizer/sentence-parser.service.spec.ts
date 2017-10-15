import { TestBed, inject } from '@angular/core/testing';

import { SentenceParserService } from './sentence-parser.service';

describe('SentenceParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SentenceParserService]
    });
  });

  it('should be created', inject([SentenceParserService], (service: SentenceParserService) => {
    expect(service).toBeTruthy();
  }));
});
