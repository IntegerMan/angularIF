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

  public error(input: any): void {
    if (console) {
      console.error(input);
    }
  }

  public warning(input: any): void {
    if (console) {
      console.warn(input);
    }
  }

  public debug(input: any): void {
    this.log(input);
  }

  public table(...data: any[]) {
    if (console) {
      console.table(data);
    }
  }
}
