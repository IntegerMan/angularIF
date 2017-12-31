import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {LoggingService} from './logging.service';

declare let ga: any;

@Injectable()
export class GoogleAnalyticsService {

  static get instance(): GoogleAnalyticsService {
    if (!this._instance) {
      this._instance = new GoogleAnalyticsService();
    }
    return this._instance;
  }

  private static _instance: GoogleAnalyticsService;

  constructor() {
    GoogleAnalyticsService._instance = this;
  }

  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {

    if (environment.enableAnalytics) {

      if (!ga) {
        LoggingService.instance.warning('Cannot end analytics event without ga defined.');
      } else {
        ga('send', 'event', {
          eventCategory: eventCategory,
          eventLabel: eventLabel,
          eventAction: eventAction,
          eventValue: eventValue
        });
      }

    }

  }

}
