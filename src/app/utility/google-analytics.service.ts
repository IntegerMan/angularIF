import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

declare let ga: any;

@Injectable()
export class GoogleAnalyticsService {

  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {

    if (environment.production) {

      ga('send', 'event', {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      });

    }

  }

}
