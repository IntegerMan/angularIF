import { TestBed, inject } from '@angular/core/testing';

import { ScoreService } from './score.service';
import {EngineModule} from './engine.module';

describe('ScoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EngineModule]
    });
  });

  it('should be created', inject([ScoreService], (service: ScoreService) => {
    expect(service).toBeTruthy();
  }));
});
