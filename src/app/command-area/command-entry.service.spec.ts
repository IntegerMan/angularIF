import { TestBed, inject } from '@angular/core/testing';

import { CommandEntryService } from './command-entry.service';

describe('CommandEntryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandEntryService]
    });
  });

  it('should be created', inject([CommandEntryService], (service: CommandEntryService) => {
    expect(service).toBeTruthy();
  }));
});
