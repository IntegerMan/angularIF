import { TestBed, inject } from '@angular/core/testing';

import { TemplatingService } from './templating.service';

describe('TemplatingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TemplatingService]
    });
  });

  it('should be created', inject([TemplatingService], (service: TemplatingService) => {
    expect(service).toBeTruthy();
  }));
});
