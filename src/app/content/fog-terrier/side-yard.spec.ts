import {async, inject, TestBed} from '@angular/core/testing';

import {Room} from '../../engine/entities/room';
import {TestingModule} from '../../testing/testing.module';
import {FogTerrierTestingService} from './fog-terrier-testing.service';
import {WorldEntity} from '../../engine/entities/world-entity';

describe('FogTerrier.YourHouse.Sideyard', () => {

  let game: FogTerrierTestingService;
  let room: Room;
  let whacker: WorldEntity;
  let tallGrass: WorldEntity;
  let wornGrass: WorldEntity;

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
      tallGrass = room.findEntityByKey('sideyard_grass');
      wornGrass = room.findEntityByKey('sideyard_worn_trail');

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
    expect(game.player.has(whacker)).toBeFalsy();
    expect(game.lastReply).toContain(`garage`); // Something telling the user that it isn't here
    expect(game.lastReply).toContain(`time`); // Something telling the user that they shouldn't worry about it
  });

  // Object: Tall Grass (scenic object)
  it('should contain tall grass', () => {
    expect(tallGrass).toBeTruthy();
  });

  it('should resolve "tall grass" as the tall grass object', () => {
    const entity: WorldEntity = game.lookForEntity('tall grass', tallGrass.key);
    expect(entity).toBeTruthy();
  });

  it('should have a custom message when inspecting the tall grass', () => {
    game.input('look at the tall grass');
    expect(game.lastReply).toContain(`clinging`);
  });

  it('should not allow the tall grass to be picked up', () => {
    game.input('get tall grass');
    expect(game.player.has(tallGrass)).toBeFalsy();
    expect(game.lastReply).toContain(`not the time`);
  });

  it('should have a custom message when trying to pull the tall grass', () => {
    game.input('pull the tall grass');
    expect(game.player.has(tallGrass)).toBeFalsy();
    expect(game.lastReply).toContain(`attend`);
  });

  it('should have a custom message when trying to mow the tall grass', () => {
    game.input('mow the tall grass');
    expect(game.player.has(tallGrass)).toBeFalsy();
    expect(game.lastReply).toContain(`attend`);
  });

  it('should have a custom message when trying to cut the tall grass', () => {
    game.input('cut the tall grass');
    expect(game.player.has(tallGrass)).toBeFalsy();
    expect(game.lastReply).toContain(`attend`);
  });

  // Object: Worn patch of Grass (scenic object)
  it('should contain a worn patch of grass', () => {
    expect(wornGrass).toBeTruthy();
  });

  it('should resolve "worn grass" as the worn patch of grass', () => {
    const entity: WorldEntity = game.lookForEntity('worn grass', wornGrass.key);
    expect(entity).toBeTruthy();
  });

  it('should have a custom message when inspecting the worn patch of grass', () => {
    game.input('look at the worn grass');
    expect(game.lastReply).toContain(`walk`);
  });

  it('should not allow the worn grass to be picked up', () => {
    game.input('get the worn patch of grass');
    expect(game.player.has(wornGrass)).toBeFalsy();
    expect(game.lastReply).toContain(`trampled`);
  });

  it('should have a custom message when trying to cut the worn patch grass', () => {
    game.input('cut the worn patch of grass');
    expect(game.player.has(wornGrass)).toBeFalsy();
    expect(game.lastReply).toContain(`attend`);
  });
});
