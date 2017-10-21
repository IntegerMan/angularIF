import * as Rollbar from 'rollbar';

import { ErrorHandler } from '@angular/core';
import { Injectable, Injector } from '@angular/core';

import { InjectionToken } from '@angular/core';
import {environment} from '../../environments/environment';
import {LoggingService} from './logging.service';

export let rollbarConfig = {
  accessToken: '2eaf4f1d5d8442ca97589706748ba22f',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enabled: environment.production,
  environment: environment.environmentName
};

@Injectable()
export class RollbarErrorHandler implements ErrorHandler {
  constructor(private injector: Injector,) {}

  handleError(err: any): void {

    LoggingService.instance.error(err);

    const rollbar = this.injector.get(RollbarService);
    rollbar.error(err.originalError || err);
  }
}

export function rollbarFactory() {
  return new Rollbar(rollbarConfig);
}

export const RollbarService = new InjectionToken<Rollbar>('rollbar');
