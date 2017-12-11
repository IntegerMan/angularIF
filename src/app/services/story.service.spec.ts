import { TestBed, inject } from '@angular/core/testing';

import { StoryService } from './story.service';
import {TestingModule} from '../testing/testing.module';

describe('StoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    });
  });

  it('should be created', inject([StoryService], (service: StoryService) => {
    expect(service).toBeTruthy();
  }));
});
