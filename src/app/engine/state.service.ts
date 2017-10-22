import { Injectable } from '@angular/core';
import {LoggingService} from '../utility/logging.service';
import {TextOutputService} from './text-output.service';

@Injectable()
export class StateService {

  showStateChanges: boolean = false;

  private state: any;

  constructor() {
    this.state = {};
  }

  public getState(key: any, defaultValue: any = null): any {
    if (this.state[key]) {
      this.log(`Get state ${key} was ${this.state[key]}`);
      return this.state[key];
    }

   this.log(`Get state ${key} was not found and is defaulting to ${defaultValue}`);
    return defaultValue;
  }

  public setState(key: any, value: any): void {
    this.log(`Setting state ${key} to ${value}`);
    this.state[key] = value;
  }

  public clear(): void {
    this.log('Clearing state');
    this.state = {};
  }

  private log(message: string) {
    if (this.showStateChanges) {
      TextOutputService.instance.displaySystem(message);
    } else {
      LoggingService.instance.debug(message);
    }
  }
}
