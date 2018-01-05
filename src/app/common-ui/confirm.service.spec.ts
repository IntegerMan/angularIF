import { TestBed, inject } from '@angular/core/testing';

import { ConfirmService } from './confirm.service';

describe('ConfirmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmService]
    });
  });

  it('should be created', inject([ConfirmService], (service: ConfirmService) => {
    expect(service).toBeTruthy();
  }));
});
