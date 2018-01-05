import { TestBed, inject } from '@angular/core/testing';

import { InteractiveFictionService } from './interactive-fiction.service';
import {TestingModule} from '../testing/testing.module';

describe('InteractiveFictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
  });
  });

  it('should be created', inject([InteractiveFictionService], (service: InteractiveFictionService) => {
    expect(service).toBeTruthy();
  }));
});
