import {WorldEntity} from './world-entity';
import {CommandContext} from '../command-context';

export interface ICanContainEntities {

  getContainedEntities(context: CommandContext, includeHidden: boolean): WorldEntity[];

}
