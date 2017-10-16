import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  static get instance(): LoggingService {
    if (!this._instance) {
      this._instance = new LoggingService();
    }
    return this._instance;
  }

  private static _instance: LoggingService;

  constructor() {
    LoggingService._instance = this;
  }

  public log(input: any): void {
    if (console) {
      console.log(input);
    }
  }

  public error(input: string): void {
    if (console) {
      console.error(input);
    }
  }

  public warning(input: string): void {
    if (console) {
      console.warn(input);
    }
  }

}
