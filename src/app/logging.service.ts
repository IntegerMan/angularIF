import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  constructor() { }

  log(input: any) {
    console.log(input);
  }
}
