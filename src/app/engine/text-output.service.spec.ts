import { TestBed, inject } from '@angular/core/testing';

import { TextOutputService } from './text-output.service';
import {TestingModule} from '../testing/testing.module';

describe('TextOutputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    });
  });

  it('should be created', inject([TextOutputService], (service: TextOutputService) => {
    expect(service).toBeTruthy();
  }));
});
