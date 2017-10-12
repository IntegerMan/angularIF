import { TestBed, inject } from '@angular/core/testing';

import { TextOutputService } from './text-output.service';

describe('TextOutputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextOutputService]
    });
  });

  it('should be created', inject([TextOutputService], (service: TextOutputService) => {
    expect(service).toBeTruthy();
  }));
});
