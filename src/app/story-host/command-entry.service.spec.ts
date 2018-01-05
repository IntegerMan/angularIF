import { TestBed, inject } from '@angular/core/testing';

import { CommandEntryService } from './command-entry.service';
import {TestingModule} from '../testing/testing.module';

describe('CommandEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule]
    });
  });

  it('should be created', inject([CommandEntryService], (service: CommandEntryService) => {
    expect(service).toBeTruthy();
  }));
});
