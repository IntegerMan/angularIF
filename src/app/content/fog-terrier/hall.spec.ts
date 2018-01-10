import {Room} from '../../engine/entities/room';
import {StorySpecVerifier} from '../../testing/story-spec-verifier';
import {FogTerrierStory} from './fog-terrier-story';

describe('FogTerrier.YourHouse.Hall', () => {

  let game: StorySpecVerifier;
  let room: Room;

  beforeEach(() =>  {
    const storyFunc = (nlp) => new FogTerrierStory(nlp);
    game = StorySpecVerifier.prepareToTest(storyFunc);
    room = game.warpTo('hall');
  });

  // Room: Hall
  it('should contain a hall room that passes spec validation', () => {

    const spec = game.buildRoomSpec(room)
      .shouldResolveFrom(`hall`)
      .shouldResolveFrom(`front hall`)
      .shouldResolveFrom(`entryway`)
      .shouldNavigateTo('n', 'frontyard')
      .shouldNavigateTo('w', 'office')
      .shouldNavigateTo('s', 'kitchen')
      .shouldNavigateTo('go out', 'frontyard')
      .shouldNavigateTo('go outside', 'frontyard')
      .shouldNavigateTo('go to the frontyard', 'frontyard')
      .shouldFailNavigationTo('up', `don't need`)
      .shouldFailNavigationTo('climb stairs', `don't need`)
      .shouldFailNavigationTo('go up the stairs', `don't need`)
      .shouldFailNavigationTo('go upstairs', `don't need`)
      .shouldRespondToCommandWith(`look`, `door`, `stairs`, `office`, `kitchen`, `rack`, `painting`)
      .shouldRespondToCommandWith(`look s`, `kitchen`)
      .shouldRespondToCommandWith(`look n`, `front yard`)
      .shouldRespondToCommandWith(`look w`, `office`)
      .shouldRespondToCommandWith(`look up`, `hallway`)
      .shouldNotBeGettable('serious');

    expect(spec.validate()).toBeFalsy();
  });

});
