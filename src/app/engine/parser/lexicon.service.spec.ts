import { TestBed, inject } from '@angular/core/testing';

import { LexiconService } from './lexicon.service';

describe('LexiconService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LexiconService]
    });
  });

  it('should be created', inject([LexiconService], (service: LexiconService) => {
    expect(service).toBeTruthy();
  }));
});
