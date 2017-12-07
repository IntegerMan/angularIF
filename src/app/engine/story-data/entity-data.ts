import {ItemData} from './item-data';
import {AliasData} from './alias-data';
import {VerbData} from './verb-data';
import {AttributeData} from './attribute-data';

export abstract class EntityData {

  key: string;
  name: string;

  aliases: AliasData;

  verbData: VerbData[];

  attributeData: AttributeData[];
  attributes: {};

  contents: ItemData[];

  describeWithRoom: boolean = true;

  // Editor Specific items here:
  parent: EntityData;
  nodeType: string;

}
