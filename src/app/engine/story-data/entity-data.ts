import {ItemData} from './item-data';
import {AliasData} from './alias-data';

export abstract class EntityData {

  id: string;
  name: string;

  aliases: AliasData;

  description: string | any[];
  examineDescription: string | any[];

  contents: ItemData[];

}
