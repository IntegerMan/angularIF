import {async, inject, TestBed} from '@angular/core/testing';

import {GameState} from '../../engine/game-state.enum';
import {TestingModule} from '../../testing/testing.module';
import {FogTerrierTestingService} from './fog-terrier-testing.service';

describe('FogTerrier', () => {

  let game: FogTerrierTestingService;

  beforeEach(() =>  {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [ FogTerrierTestingService ]
    })
      .compileComponents();

  });

  beforeEach(async(inject([FogTerrierTestingService],
    (testingService: FogTerrierTestingService) => {

      game = testingService;

    })));

  it('should create', () => {
    expect(game.story).toBeTruthy();
  });

  it('should have a title of November Project', () => {
    expect(game.story.name).toBe('November Project');
  });

  it('should have a max score of 100', () => {
    expect(game.maxScore).toBe(100);
  });

  it('should start underway', () => {
    expect(game.gameState).toBe(GameState.underway);
  });

  it('should have a start score of 0', () => {
    expect(game.currentScore).toBe(0);
  });

  it('should start in the office', () => {
    expect(game.currentRoom.key).toBe('office');
  });

});
