import {WorldEntity} from '../engine/entities/world-entity';
import {StoryTestingServiceBase} from './story-testing-service-base';
import {Room} from '../engine/entities/room';
import {isNull, isNullOrUndefined} from 'util';

export class EntitySpec {

  private checks: Function[];

  protected key: string;
  protected entity: WorldEntity;
  protected game: StoryTestingServiceBase;
  protected room: Room;

  constructor(key: string, room: Room, testService: StoryTestingServiceBase) {
    this.key = key;
    this.checks = [];
    this.game = testService;
    this.room = room;
  }

  public shouldNotBeGettable(...expectedReplyString: string[]): EntitySpec {

    this.addCheck( () => {
      this.game.input(`get ${this.entity.that}`);
      if (this.game.player.has(this.entity)) {
        return `${this.entity.that} was owned by the player after a get command when it should not have been.`;
      }
      return this.checkForExpectedReply(...expectedReplyString);
    });

    return this;
  }

  public shouldBeGettable(...expectedReplyString: string[]): EntitySpec {
    this.addCheck( () => {
      this.game.input(`get ${this.entity.that}`);
      if (!this.game.player.has(this.entity)) {
        return `${this.entity.that} was not owned by the player after a get command when it should have been.`;
      }
      return this.checkForExpectedReply(...expectedReplyString);
    });

    return this;
  }

  public shouldRespondToCommandWith(input: string, ...expectedReplyString: string[]): EntitySpec {
    this.addCheck( () => {
      this.game.input(input);
      return this.checkForExpectedReply(...expectedReplyString);
    });

    return this;
  }

  public shouldRespondToVerbWith(verb: string, ...expectedReplyString: string[]): EntitySpec {
    this.addCheck( () => {
      this.game.input(`${verb} ${this.entity.that}`, ...expectedReplyString);
      return this.checkForExpectedReply(...expectedReplyString);
    });
    return this;
  }

  public shouldResolveFrom(text: string): EntitySpec {
    this.addCheck( () => {
      if (!this.game.lookForEntity(text, this.key)) {
        return `${this.entity.that} could not be resolved using '${text}'.`;
      }
      return null;
    });

    return this;
  }

  public shouldDescribeWithRoom(): EntitySpec {

    this.addCheck( () => {
      if (!this.entity.shouldDescribeWithRoom(this.game.context)) {
        return `${this.entity.that} should describe with the room (${this.room.key}), but does not.`;
      }
      return null;
    });

    return this;
  }

  public shouldNotDescribeWithRoom(): EntitySpec {

    this.addCheck( () => {
      if (this.entity.shouldDescribeWithRoom(this.game.context)) {
        return `${this.entity.that} should not describe with the room (${this.room.key}), but does.`;
      }
      return null;
    });

    return this;
  }

  public shouldHaveAttributeValue(attribute: string, expected: any): EntitySpec {
    this.addCheck( () => {
      const actual = this.entity.getAttribute(attribute, undefined);
      if (actual !== expected) {
        return `${this.entity.that} should have attribute ${attribute} of value ${expected} but has a value of ${actual} instead.`;
      }
      return null;
    });
    return this;
  }

  public validate(): string {

    // Validate room
    if (!this.room) {
      return `The entity ${this.key} could not be located without a room. Tests could not be evaluated.`;
    }

    if (!this.checks) {
      return `Checks collection is not defined. Context of the test object may not be correct: ${this.constructor.name}`;
    }

    // Validate each registered function
    let output: string;
    for (const f of this.checks) {

      // Ensure we start from the same room every time. This is important for room navigation tests
      const resetValidateResult = this.resetForEachTest();
      if (!isNullOrUndefined(resetValidateResult)) {
        return resetValidateResult;
      }

      // Perform the actual function invoke
      const result: string = f.bind(this)();

      // Check the result
      if (result) {
        if (!output) {
          output = `Validation failed for entity ${this.key}: ${this.entity.that} in ${this.room.key}`;
        }
        output += `\r\n${result}`;
      }
    }

    return output;
  }

  protected addCheck(check: () => (string | any)) {
    this.checks.push(check);
  }

  protected checkForExpectedReply(...expectedReplyString: string[]): string {

    const actualReply: string = this.game.lastReply;
    const actualReplyLower: string = actualReply.toLowerCase();

    for (const expectedReply of expectedReplyString) {
      if (actualReplyLower.indexOf(expectedReply.toLowerCase()) < 0) {
        return `Response '${actualReply}' to '${this.game.lastInput}' did not contain '${expectedReply}'`;
      }
    }

    return null;

  }

  private resetForEachTest(): string {

    // Ensure we're where we need to be
    this.game.warpTo(this.room.key, false);

    // Locate entity
    this.entity = this.room.findEntityByKey(this.key);

    // Validate entity
    if (!this.entity) {
      return `The entity ${this.key} could not be located in room ${this.room.key}. Tests could not be evaluated.`;
    }
    if (this.entity.key !== this.key) {
      return `The entity ${this.key} did not match the expected key of ${this.key}. Tests could not be evaluated.`;
    }

    return null;

  }

}
