import {async, inject, TestBed} from '@angular/core/testing';

import {GameState} from '../../engine/game-state.enum';
import {TestingModule} from '../../testing/testing.module';
import {CloakTestingService} from './cloak-testing.service';

describe('CloakStory', () => {

  let game: CloakTestingService;

  beforeEach(() =>  {
    TestBed.configureTestingModule({
      imports: [ TestingModule ],
      providers: [ CloakTestingService ]
    })
      .compileComponents();

  });

  beforeEach(async(inject([CloakTestingService],
    (testingService: CloakTestingService) => {

    game = testingService;

  })));

  it('should create', () => {
    expect(game.story).toBeTruthy();
  });

  it('should have a title of cloak of darkness', () => {
    expect(game.story.name).toBe('Cloak of Darkness');
  });

  it('should have a max score of 2', () => {
    expect(game.maxScore).toBe(2);
  });

  it('should start underway', () => {
    expect(game.gameState).toBe(GameState.underway);
  });

  it('should have a start score of 0', () => {
    expect(game.currentScore).toBe(0);
  });

  it('should start in the foyer', () => {
    expect(game.currentRoom.key).toBe('foyer');
  });

  it('should start with the cloak', () => {
    expect(game.player.findEntityByKey('cloak')).toBeTruthy();
  });

  it('should not allow dropping the cloak in the foyer', () => {
    game.input('drop the velvet cloak');
    expect(game.lastReply).toBe(`This isn't the best place to leave a smart cloak lying around.`);
    expect(game.player.findEntityByKey('cloak')).toBeTruthy();
  });

  it('should allow going south to the bar', () => {
    game.input('s');
    expect(game.currentRoom.key).toBe('bar');
  });

  it('should allow going south, then back to the north (in the dark)', () => {
    game.input('s');
    game.input('n');
    expect(game.currentRoom.key).toBe('foyer');
  });

  it('should allow putting the cloak on the hook for 1 point', () => {
    game.input('w');
    game.input('put the velvet cloak on the hook');
    expect(game.player.findEntityByKey('cloak')).toBeFalsy();
    expect(game.currentScore).toBe(1);
  });

  it('should be winnable with max score in 5 moves', () => {
    game.input('w');
    game.input('put the cloak on the small hook');
    game.input('e');
    game.input('s');
    game.input('x message');
    expect(game.gameState).toBe(GameState.won);
    expect(game.currentScore).toBe(2);
  });

  it('should be loseable', () => {
    game.input('s');
    game.input('drop cloak');
    game.input('x self');
    game.input('x room');
    game.input('n');
    game.input('w');
    game.input('put the cloak on the small hook');
    game.input('e');
    game.input('s');
    game.input('x message');
    expect(game.gameState).toBe(GameState.lost);
    expect(game.currentScore).toBe(1);
  });

});
