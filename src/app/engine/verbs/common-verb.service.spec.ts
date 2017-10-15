import { TestBed, inject } from '@angular/core/testing';

import { CommonVerbService } from './common-verb.service';

describe('CommonVerbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonVerbService]
    });
  });

  it('should be created', inject([CommonVerbService], (service: CommonVerbService) => {
    expect(service).toBeTruthy();
  }));
});
