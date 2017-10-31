import {EntityData} from './entity-data';
import {ItemEvents} from './item-events';

export class ItemData extends EntityData {

  allowHang: boolean = false;
  isWearable: boolean;
  isWorn: boolean;

  maxContents: number;

  emptyDescription: string | any[];
  inRoomDescription: string | any[];
  describeWithRoom: boolean = true;

  events: ItemEvents;

}
