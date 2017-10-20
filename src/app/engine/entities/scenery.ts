import {WorldEntity} from './world-entity';
import {CommandContext} from '../command-context';

export class Scenery extends WorldEntity {

  shouldDescribeWithRoom(context: CommandContext): boolean {
    return true;
  }


}
