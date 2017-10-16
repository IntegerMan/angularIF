import {Scenery} from '../../engine/scenery';

export class Hook extends Scenery {

  hungObject: Scenery = null;

  getExamineDescription(): string {
    if (this.hungObject) {
      return `It's just a ${name} with a ${this.hungObject.name} hanging on it.`;
    } else {
      return `It's just a ${name} screwed to the wall.`;
    }
  }

}
