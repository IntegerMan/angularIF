import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {

  constructor() { }

  log(input: string) {
    console.log(input);
  }
}
