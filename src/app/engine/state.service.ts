import { Injectable } from '@angular/core';
import {LoggingService} from '../utility/logging.service';

@Injectable()
export class StateService {

  private state: any;

  constructor() {
    this.state = {};
  }

  public getState(key: any, defaultValue: any = null): any {
    if (this.state[key]) {
      LoggingService.instance.debug(`Get state ${key} was ${this.state[key]}`);
      return this.state[key];
    }

    LoggingService.instance.debug(`Get state ${key} was not found and is defaulting to ${defaultValue}`);
    return defaultValue;
  }

  public setState(key: any, value: any): void {
    LoggingService.instance.debug(`Setting state ${key} to ${value}`);
    this.state[key] = value;
  }

  public clear(): void {
    LoggingService.instance.debug(`Clearing state`);
    this.state = {};
  }
}
