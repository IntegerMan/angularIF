import {WorldEntity} from './world-entity';
import {CommandContext} from '../command-context';

export class Scenery extends WorldEntity {

  constructor(name: string) {
    super(name);

  }

  shouldDescribeWithRoom(context: CommandContext): boolean {
    return true;
  }


}
