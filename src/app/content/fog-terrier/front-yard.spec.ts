import {Room} from '../../engine/entities/room';
import {StorySpecVerifier} from '../../testing/story-spec-verifier';
import {FogTerrierStory} from './fog-terrier-story';

describe('FogTerrier.YourHouse.Sideyard', () => {

  let game: StorySpecVerifier;
  let room: Room;

  beforeEach(() =>  {
    const storyFunc = (nlp) => new FogTerrierStory(nlp);
    game = StorySpecVerifier.prepareToTest(storyFunc);
    room = game.warpTo('frontyard');
  });

  // Room: Front Yard
  it('should contain a front yard room that passes spec validation', () => {

    const spec = game.buildRoomSpec(room)
      .shouldResolveFrom(`frontyard`)
      .shouldResolveFrom(`front yard`)
      .shouldNavigateTo('w', 'nearplayground')
      .shouldNavigateTo('e', 'cornerwp')
      .shouldNavigateTo('s', 'hall')
      .shouldNavigateTo('se', 'sideyard')
      .shouldNavigateTo('go in', 'hall')
      .shouldNavigateTo('go inside', 'hall')
      .shouldNavigateTo('go to the sideyard', 'sideyard')
      .shouldFailNavigationTo('sw', `poop`)
      .shouldFailNavigationTo('nw', `house`)
      .shouldFailNavigationTo('n', `house`)
      .shouldFailNavigationTo('ne', `house`)
      .shouldRespondToCommandWith(`look`, `front`, `yard`, `car`, `fog`, `house`, `door`, `west`, `east`, `southeast`)
      .shouldRespondToCommandWith(`look s`, `door`)
      .shouldRespondToCommandWith(`look n`, `neighbor`)
      .shouldRespondToCommandWith(`look w`, `street`)
      .shouldRespondToCommandWith(`look e`, `corner`)
      .shouldNotBeGettable('serious');

    expect(spec.validate()).toBeFalsy();
  });

});
