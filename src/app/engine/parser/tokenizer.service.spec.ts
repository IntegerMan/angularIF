import { TestBed, inject } from '@angular/core/testing';

import { TokenizerService } from './tokenizer.service';

describe('TokenizerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TokenizerService]
    });
  });

  it('should be created', inject([TokenizerService], (service: TokenizerService) => {
    expect(service).toBeTruthy();
  }));
});
