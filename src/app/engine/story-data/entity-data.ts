import {ItemData} from './item-data';
import {AliasData} from './alias-data';

export abstract class EntityData {

  id: string;
  name: string;

  aliases: AliasData;

  description: string | any[];
  contents: ItemData[];

  // Items below this marker do not make sense to be shared with rooms
  emptyDescription: string | any[];
  inRoomDescription: string | any[];
  describeWithRoom: boolean = true;

}
