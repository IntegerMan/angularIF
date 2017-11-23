import {async, inject, TestBed} from '@angular/core/testing';

import {Room} from '../../engine/entities/room';
import {TestingModule} from '../../testing/testing.module';
import {FogTerrierTestingService} from './fog-terrier-testing.service';

describe('FogTerrier.YourHouse.Sideyard', () => {

  let game: FogTerrierTestingService;
  let room: Room;

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
      room = game.warpTo('sideyard');

    })));

  it('should start in the requested room', () => {
    expect(room).toBeTruthy();
    expect(room.key).toBe('sideyard');
  });

  it('should contain an exit to the south to the backyard', () => {
    game.input('s');
    expect(game.currentRoom.key).toBe('backyard');
  });

  it('should contain an exit to the southwest to the backyard', () => {
    game.input('sw');
    expect(game.currentRoom.key).toBe('backyard');
  });

  it('should contain an exit to the north to the frontyard', () => {
    game.input('n');
    expect(game.currentRoom.key).toBe('frontyard');
  });

  it('should contain an exit to the northwest to the frontyard', () => {
    game.input('nw');
    expect(game.currentRoom.key).toBe('frontyard');
  });

  // Object: Weed Whacker (missing object referenced in passing)
  it('should contain a weed whacker that passes spec validation', () => {

    const spec = game.buildEntitySpec('sideyard_weed_whacker', room)
      .shouldResolveFrom('weed whacker')
      .shouldResolveFrom('whacker')
      .shouldNotDescribeWithRoom()
      .shouldHaveAttributeValue('missing', true)
      .shouldNotBeGettable('garage', 'time')
      .shouldRespondToVerbWith('look', 'don\'t see')
      .shouldRespondToVerbWith('pull', 'don\'t see');

    expect(spec.validate()).toBeFalsy();
  });

  // Object: Tall Grass (scenic object)
  it('should contain tall grass that passes spec validation', () => {

    const spec = game.buildEntitySpec('sideyard_grass', room)
      .shouldResolveFrom('tall grass')
      .shouldNotDescribeWithRoom()
      .shouldNotBeGettable('not the time')
      .shouldRespondToVerbWith('look', 'clinging')
      .shouldRespondToVerbWith('pull', 'attend')
      .shouldRespondToVerbWith('cut', 'attend')
      .shouldRespondToVerbWith('mow', 'attend');

    expect(spec.validate()).toBeFalsy();
  });

  // Object: Worn Patch of Grass (scenic object)
  it('should contain a worn patch of grass that passes spec validation', () => {

    const spec = game.buildEntitySpec('sideyard_worn_trail', room)
      .shouldResolveFrom('worn grass')
      .shouldResolveFrom('patch of grass')
      .shouldResolveFrom('worn patch')
      .shouldResolveFrom('patch')
      .shouldNotDescribeWithRoom()
      .shouldNotBeGettable('trampled')
      .shouldRespondToVerbWith('look', 'walk')
      .shouldRespondToVerbWith('pull', 'trampled')
      .shouldRespondToVerbWith('cut', 'attend')
      .shouldRespondToVerbWith('mow', 'attend');

    expect(spec.validate()).toBeFalsy();
  });

});
