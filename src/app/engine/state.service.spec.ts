import { TestBed, inject } from '@angular/core/testing';

import { StateService } from './state.service';
import {EngineModule} from './engine.module';

describe('StateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EngineModule]
    });
  });

  it('should be created', inject([StateService], (service: StateService) => {
    expect(service).toBeTruthy();
  }));
});
