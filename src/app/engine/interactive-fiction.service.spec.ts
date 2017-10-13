import { TestBed, inject } from '@angular/core/testing';

import { InteractiveFictionService } from './interactive-fiction.service';

describe('InteractiveFictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InteractiveFictionService]
    });
  });

  it('should be created', inject([InteractiveFictionService], (service: InteractiveFictionService) => {
    expect(service).toBeTruthy();
  }));
});
