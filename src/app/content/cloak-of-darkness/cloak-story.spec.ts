import {async, inject, TestBed} from '@angular/core/testing';

import {CloakStory} from './cloak-story';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {CommandContext} from '../../engine/command-context';
import {UserInputService} from '../../engine/user-input.service';
import {TextOutputService} from '../../engine/text-output.service';
import {GameState} from '../../engine/game-state.enum';
import {TestingModule} from '../../testing/testing.module';

describe('CloakStory', () => {

  let story: CloakStory;
  let ifService: InteractiveFictionService;
  let input: UserInputService;
  let output: TextOutputService;
  let context: CommandContext;

  beforeEach(() =>  {
    TestBed.configureTestingModule({
      imports: [ TestingModule ]
    })
      .compileComponents();

  });

  beforeEach(async(inject([InteractiveFictionService, UserInputService, TextOutputService],
    (service: InteractiveFictionService, inputService: UserInputService, outputService: TextOutputService) => {

    story = new CloakStory();
    ifService = service;
    input = inputService;
    output = outputService;

    ifService.initialize(story);
    context = ifService.buildCommandContext();
  })));

  it('should create', () => {
    expect(story).toBeTruthy();
  });

  it('should have a title of cloak of darkness', () => {
    expect(ifService.story.name).toBe('Cloak of Darkness');
  });

  it('should have a max score of 2', () => {
    expect(ifService.maxScore).toBe(2);
  });

  it('should start underway', () => {
    expect(ifService.gameState).toBe(GameState.underway);
  });

  it('should have a start score of 0', () => {
    expect(ifService.currentScore).toBe(0);
  });

  it('should start in the foyer', () => {
    expect(context.currentRoom.key).toBe('foyer');
  });

  it('should start with the cloak', () => {
    expect(context.player.findEntityByKey('cloak')).toBeTruthy();
  });

  it('should not allow dropping the cloak in the foyer', () => {
    input.handleUserSentence('drop the velvet cloak');
    expect(context.player.findEntityByKey('cloak')).toBeTruthy();
    expect(output.lastLine.text).toBe(`This isn't the best place to leave a smart cloak lying around.`);
  });

  it('should allow going south to the bar', () => {
    input.handleUserSentence('s');
    expect(context.currentRoom.key).toBe('bar');
  });

  it('should allow going south, then back to the north (in the dark)', () => {
    input.handleUserSentence('s');
    input.handleUserSentence('n');
    expect(context.currentRoom.key).toBe('foyer');
  });

  it('should allow putting the cloak on the hook for 1 point', () => {
    input.handleUserSentence('w');
    input.handleUserSentence('put the velvet cloak on the hook');
    expect(context.player.findEntityByKey('cloak')).toBeFalsy();
    expect(ifService.currentScore).toBe(1);
  });

  it('should be winnable with max score in 5 moves', () => {
    input.handleUserSentence('w');
    input.handleUserSentence('put the cloak on the small hook');
    input.handleUserSentence('e');
    input.handleUserSentence('s');
    input.handleUserSentence('x message');
    expect(ifService.gameState).toBe(GameState.won);
    expect(ifService.currentScore).toBe(2);
  });

  it('should be loseable', () => {
    input.handleUserSentence('s');
    input.handleUserSentence('drop cloak');
    input.handleUserSentence('x self');
    input.handleUserSentence('x room');
    input.handleUserSentence('n');
    input.handleUserSentence('w');
    input.handleUserSentence('put the cloak on the small hook');
    input.handleUserSentence('e');
    input.handleUserSentence('s');
    input.handleUserSentence('x message');
    expect(ifService.gameState).toBe(GameState.lost);
    expect(ifService.currentScore).toBe(1);
  });

});
