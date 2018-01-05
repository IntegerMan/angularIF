import { TestBed, inject } from '@angular/core/testing';

import { UserInputService } from './user-input.service';
import {TestingModule} from '../testing/testing.module';

describe('UserInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    });
  });

  it('should be created', inject([UserInputService], (service: UserInputService) => {
    expect(service).toBeTruthy();
  }));
});
