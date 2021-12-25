import {Injectable} from '@angular/core';
import {environment} from '../../../../../environments/environment';

declare const gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class GaService {

  public emitEvent(eventCategory: string,
                   eventLabel: string,
                   eventValue: number = null) {
    if (environment.production && window['gtag']) {
      gtag('event', 'send', {
        event_category: eventCategory,
        event_label: eventLabel,
        value: eventValue
      });
    }
  }
}
