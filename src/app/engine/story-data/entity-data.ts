import {ItemData} from './item-data';
import {AliasData} from './alias-data';

export abstract class EntityData {

  key: string;
  name: string;

  aliases: AliasData;

  verbs: {};
  attributes: {};
  
  contents: ItemData[];

  // Editor Specific items here:
  parent: EntityData;
  nodeType: string;

}
