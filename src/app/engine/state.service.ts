import { Injectable } from '@angular/core';

@Injectable()
export class StateService {

  private state: any;

  constructor() {
    this.state = {};
  }

  public getState(key: any, defaultValue: any = null): any {
    if (this.state[key]) {
      return this.state[key];
    }

    return defaultValue;
  }

  public setState(key: any, value: any): void {
    this.state[key] = value;
  }

}
