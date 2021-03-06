// import {EventEmitter} from '@angular/core';

export interface ConfirmTask {
  message: string;
  // key?: string;
  // icon?: string;
  header: string;
  accept: Function;
  reject: Function;
  // acceptVisible?: boolean;
  // rejectVisible?: boolean;
  // acceptEvent?: EventEmitter<any>;
  // rejectEvent?: EventEmitter<any>;
}
