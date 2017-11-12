import {ItemData} from './item-data';
import {AliasData} from './alias-data';
import {VerbData} from './verb-data';

export abstract class EntityData {

  key: string;
  name: string;

  aliases: AliasData;

  verbData: VerbData[];

  attributes: {};

  contents: ItemData[];

  // Editor Specific items here:
  parent: EntityData;
  nodeType: string;

}
