import {CommandContext} from '../command-context';

export interface IGettable {

  allowPickup(context: CommandContext) : boolean;

}
