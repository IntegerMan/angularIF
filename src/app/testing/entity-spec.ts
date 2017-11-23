import {WorldEntity} from '../engine/entities/world-entity';
import {StoryTestingServiceBase} from './story-testing-service-base';
import {Room} from '../engine/entities/room';

export class EntitySpec {

  private key: string;

  private checks: Function[];
  private entity: WorldEntity;
  private game: StoryTestingServiceBase;
  private room: Room;

  constructor(key: string, room: Room, testService: StoryTestingServiceBase) {
    this.key = key;
    this.checks = [];
    this.game = testService;
    this.room = room;
  }

  public shouldNotBeGettable(...expectedReplyString: string[]): EntitySpec {

    this.checks.push( () => {
      this.game.input(`get ${this.entity.that}`);
      if (this.game.player.has(this.entity)) {
        return `${this.entity.that} was owned by the player after a get command when it should not have been.`;
      }
      return this.checkForExpectedReply(...expectedReplyString);
    });

    return this;
  }

  public shouldBeGettable(...expectedReplyString: string[]): EntitySpec {
    this.checks.push( () => {
      this.game.input(`get ${this.entity.that}`);
      if (!this.game.player.has(this.entity)) {
        return `${this.entity.that} was not owned by the player after a get command when it should have been.`;
      }
      return this.checkForExpectedReply(...expectedReplyString);
    });

    return this;
  }

  public shouldRespondToVerbWith(verb: string, ...expectedReplyString: string[]): EntitySpec {
    this.checks.push( () => {
      this.game.input(`${verb} ${this.entity.that}`);
      return this.checkForExpectedReply(...expectedReplyString);
    });

    return this;
  }

  public shouldResolveFrom(text: string): EntitySpec {
    this.checks.push( () => {
      if (!this.game.lookForEntity(text, this.key)) {
        return `${this.entity.that} could not be resolved using '${text}'.`;
      }
      return null;
    });

    return this;
  }

  public shouldDescribeWithRoom(): EntitySpec {
    return this;
  }

  public shouldNotDescribeWithRoom(): EntitySpec {
    return this;
  }

  public validate(): string {

    // Validate room
    if (!this.room) {
      return `The entity ${this.key} could not be located without a room. Tests could not be evaluated.`;
    }

    // Ensure we're where we need to be
    this.game.warpTo(this.room.key, false);

    console.warn(this);
    console.warn(`Searching for entity with key of ${this.key} in ${this.room.key}`);

    // Locate entity
    this.entity = this.room.findEntityByKey(this.key);

    // Validate entity
    if (!this.entity) {
      return `The entity ${this.key} could not be located in room ${this.room.key}. Tests could not be evaluated.`;
    }
    if (this.entity.key !== this.key) {
      return `The entity ${this.key} did not match the expected key of ${this.key}. Tests could not be evaluated.`;
    }

    console.warn(this.entity.that);
    console.warn(this.entity);

    // Validate each registered function
    let output: string;
    for (const f of this.checks) {
      const result: string = f.bind(this)();
      if (result) {
        if (!output) {
          output = `Validation failed for entity ${this.key}: ${this.entity.that} in ${this.room.key}`;
        }
        output += `\r\n${result}`;
      }
    }

    return output;
  }

  private checkForExpectedReply(...expectedReplyString: string[]): string {
    const actualReply: string = this.game.lastReply;
    for (const expectedReply of expectedReplyString) {
      if (actualReply.indexOf(expectedReply) < 0) {
        return `Response '${actualReply}' to '${this.game.lastInput}' did not contain '${expectedReply}'`;
      }
    }
    return null;

  }
}
