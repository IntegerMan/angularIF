import { TestBed, inject } from '@angular/core/testing';

import { ConfirmService } from './confirm.service';
import {TestingModule} from '../testing/testing.module';

describe('ConfirmService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    });
  });

  it('should be created', inject([ConfirmService], (service: ConfirmService) => {
    expect(service).toBeTruthy();
  }));
});
