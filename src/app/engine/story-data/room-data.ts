import {NavData} from './nav-data';
import {InvokeRequest} from './invoke-request';
import {EntityData} from './entity-data';

export class RoomData extends EntityData {

  isDark: boolean;
  darkName: string;
  darkDescription: string;

  nav: NavData;

  // Events
  previewAction: InvokeRequest;
  previewEnter: InvokeRequest;
  previewLeave: InvokeRequest;
  onAction: InvokeRequest;
  onEnter: InvokeRequest;
  onLeave: InvokeRequest;

}
