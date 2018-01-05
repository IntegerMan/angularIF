import { TestBed, inject } from '@angular/core/testing';

import { TemplatingService } from './templating.service';
import {TestingModule} from '../../testing/testing.module';

describe('TemplatingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    });
  });

  it('should be created', inject([TemplatingService], (service: TemplatingService) => {
    expect(service).toBeTruthy();
  }));
});
