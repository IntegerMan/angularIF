import {async, inject, TestBed} from '@angular/core/testing';

import {Room} from '../../engine/entities/room';
import {TestingModule} from '../../testing/testing.module';
import {FogTerrierTestingService} from './fog-terrier-testing.service';
import {WorldEntity} from '../../engine/entities/world-entity';

describe('FogTerrier.YourHouse.Sideyard', () => {

  let game: FogTerrierTestingService;
  let room: Room;
  let whacker: WorldEntity;

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

      // Find objects
      whacker = room.findEntityByKey('sideyard_weed_whacker');

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

  it('should contain a weed whacker "missing" object', () => {
    expect(whacker).toBeTruthy();
  });

  it('should resolve "weed whacker" as the weed whacker "missing" object', () => {
    const entity: WorldEntity = game.lookForEntity('weed whacker', whacker.key);
    expect(entity).toBeTruthy();
  });

  it('should resolve "whacker" as the weed whacker "missing" object', () => {
    const entity: WorldEntity = game.lookForEntity('whacker', whacker.key);
    expect(entity).toBeTruthy();
  });

  it('should have a weed whacker with a "missing" attribute', () => {
    expect(whacker.getAttribute('missing', 'false')).toBeTruthy();
  });

  it('should respond to looking at the weed whacker with the "not here" message', () => {
    game.input('x weed whacker');
    expect(game.lastReply).toContain(`You don't see`);
  });

  it('should fail to get the weed whacker with a custom message.', () => {
    game.input('get weed whacker');
    expect(game.player.findEntityByKey(whacker.key)).toBeFalsy();
    expect(game.lastReply).toContain(`garage`); // Something telling the user that it isn't here
    expect(game.lastReply).toContain(`time`); // Something telling the user that they shouldn't worry about it
  });

});
