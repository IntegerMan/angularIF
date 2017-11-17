import { TestBed, inject } from '@angular/core/testing';

import { TextOutputService } from './text-output.service';
import {EngineModule} from './engine.module';

describe('TextOutputService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EngineModule]
    });
  });

  it('should be created', inject([TextOutputService], (service: TextOutputService) => {
    expect(service).toBeTruthy();
  }));
});
