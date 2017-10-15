import { TestBed, inject } from '@angular/core/testing';

import { CommandParserService } from './command-parser.service';

describe('CommandParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandParserService]
    });
  });

  it('should be created', inject([CommandParserService], (service: CommandParserService) => {
    expect(service).toBeTruthy();
  }));
});
