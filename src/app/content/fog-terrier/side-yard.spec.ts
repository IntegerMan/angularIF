import {Room} from '../../engine/entities/room';
import {InteractiveFictionEngine} from '../../engine/interactive-fiction-engine';
import {CloakStory} from '../cloak-of-darkness/cloak-story';
import {StorySpecVerifier} from '../../testing/story-spec-verifier';

describe('FogTerrier.YourHouse.Sideyard', () => {

  let game: StorySpecVerifier;
  let room: Room;

  beforeEach(() =>  {
    const engine = new InteractiveFictionEngine(null);
    game = new StorySpecVerifier(engine, new CloakStory(engine.nlp));
    room = game.warpTo('sideyard');
  });

  // Room: Side Yard
  it('should contain a side yard room that passes spec validation', () => {

    const spec = game.buildRoomSpec('sideyard', room)
      .shouldResolveFrom(`sideyard`)
      .shouldResolveFrom(`side yard`)
      .shouldResolveFrom(`here`)
      .shouldResolveFrom(`room`)
      .shouldNavigateTo('nw', 'frontyard')
      .shouldNavigateTo('n', 'frontyard')
      .shouldNavigateTo('sw', 'backyard')
      .shouldNavigateTo('s', 'backyard')
      .shouldNavigateTo('go to the back', 'backyard')
      .shouldNavigateTo('go to the backyard', 'backyard')
      .shouldNavigateTo('go to the front', 'frontyard')
      .shouldNavigateTo('go to the street', 'frontyard')
      .shouldFailNavigationTo('se', `neighbor's yard`)
      .shouldFailNavigationTo('ne', `neighbor's yard`)
      .shouldFailNavigationTo('e', `neighbor's yard`)
      .shouldRespondToCommandWith(`look`, `unremarkable`, `yard`, `weed whacker`, `window well`, `grass`, `front`, `back`, `north`, `south`)
      .shouldRespondToCommandWith(`look s`, `back yard`)
      .shouldRespondToCommandWith(`look n`, `front yard`)
      .shouldRespondToCommandWith(`look w`, `your house`)
      .shouldRespondToCommandWith(`look e`, `neighbor's house`)
      .shouldNotBeGettable('serious');

    expect(spec.validate()).toBeFalsy();
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

  // Object: Dog Poop (missing object referenced in passing)
  it(`should contain a dog poop missing object that passes spec validation`, () => {

    const spec = game.buildEntitySpec('sideyard_poop', room)
      .shouldResolveFrom('dog poo')
      .shouldResolveFrom('poo')
      .shouldResolveFrom('poop')
      .shouldResolveFrom(`Jester's poop`)
      .shouldResolveFrom('crap')
      .shouldResolveFrom('shit')
      .shouldResolveFrom('turd')
      .shouldResolveFrom('feces')
      .shouldNotDescribeWithRoom()
      .shouldHaveAttributeValue('missing', true)
      .shouldNotBeGettable()
      .shouldRespondToVerbWith('look', 'don\'t', 'see', 'step');

    // TODO: Support smell once that's available

    // TODO: This should probably be tested with and without Jester in the room since he disambiguates with dog

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

  // Object: Your House
  it('should contain your house that passes spec validation', () => {

    const spec = game.buildEntitySpec('sideyard_house', room)
      .shouldResolveFrom('your house')
      .shouldResolveFrom('my house')
      .shouldNotDescribeWithRoom()
      .shouldNotBeGettable(`can't be serious`)
      .shouldRespondToVerbWith('look', 'night')
      .shouldRespondToVerbWith('pull', `serious`)
      .shouldRespondToVerbWith('cut', `don't want to damage`);

    expect(spec.validate()).toBeFalsy();
  });

  // Object: Neighbor's House
  it(`should contain a neighbor's house that passes spec validation`, () => {

    const spec = game.buildEntitySpec('sideyard_neighbor', room)
      .shouldResolveFrom(`neighbor's house`)
      .shouldResolveFrom('other house')
      .shouldResolveFrom('neighbor')
      .shouldNotDescribeWithRoom()
      .shouldNotBeGettable(`can't be serious`)
      .shouldRespondToVerbWith('look', 'better shape')
      .shouldRespondToVerbWith('pull', `serious`)
      .shouldRespondToVerbWith('cut', `don't want to damage`);

    expect(spec.validate()).toBeFalsy();
  });

  // Object: Window Wells
  it(`should contain window wells that pass spec validation`, () => {

    const spec = game.buildEntitySpec('sideyard_window_wells', room)
      .shouldResolveFrom(`window wells`)
      .shouldResolveFrom(`window well`)
      .shouldResolveFrom('windows')
      .shouldResolveFrom('window')
      .shouldResolveFrom('wells')
      .shouldResolveFrom('well')
      .shouldNotDescribeWithRoom()
      .shouldNotBeGettable()
      .shouldRespondToVerbWith('look', 'shallow', 'dark')
      .shouldRespondToVerbWith('pull', `don't`, `need`)
      .shouldRespondToVerbWith('cut', `don't want to damage`);

    expect(spec.validate()).toBeFalsy();
  });

});
