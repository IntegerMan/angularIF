import { TestBed, inject } from '@angular/core/testing';

import { UserInputService } from './user-input.service';

describe('UserInputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInputService]
    });
  });

  it('should be created', inject([UserInputService], (service: UserInputService) => {
    expect(service).toBeTruthy();
  }));
});
