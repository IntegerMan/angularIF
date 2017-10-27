import {InvokeRequest} from './invoke-request';
import {EntityData} from './entity-data';

export class ItemData extends EntityData {

  allowHang: boolean = false;
  isWearable: boolean;
  isWorn: boolean;

  maxContents: number;

  emptyDescription: string | any[];
  inRoomDescription: string | any[];
  describeWithRoom: boolean = true;

  // Events
  previewDrop: InvokeRequest;
  onDrop: InvokeRequest;
  previewGet: InvokeRequest;
  onGet: InvokeRequest;

}
