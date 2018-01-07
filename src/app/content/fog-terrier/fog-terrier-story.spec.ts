import {GameState} from '../../engine/game-state.enum';
import {InteractiveFictionEngine} from '../../engine/interactive-fiction-engine';
import {StorySpecVerifier} from '../../testing/story-spec-verifier';
import {FogTerrierStory} from './fog-terrier-story';

describe('FogTerrier', () => {

  let game: StorySpecVerifier;

  beforeEach(() =>  {
    const engine = new InteractiveFictionEngine(null);
    game = new StorySpecVerifier(engine, new FogTerrierStory(engine.nlp));
  });

  it('should create', () => {
    expect(game.story).toBeTruthy();
  });

  it('should have a title of Fog Terrier', () => {
    expect(game.story.name).toBe('Fog Terrier');
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
