import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  constructor() { }

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
