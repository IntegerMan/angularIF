import {InvokeRequest} from './invoke-request';
import {EntityData} from './entity-data';

export class RoomData extends EntityData {

  isDark: boolean;
  darkName: string;
  darkDescription: string;

  // This is effectively a dictionary of direction names
  nav: {};

  // Events
  previewAction: InvokeRequest;
  previewEnter: InvokeRequest;
  previewLeave: InvokeRequest;
  onAction: InvokeRequest;
  onEnter: InvokeRequest;
  onLeave: InvokeRequest;

}
