import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
declare const ga: Function;

@Injectable()
export class GaService {

  public emitEvent(eventCategory: string,
                   eventAction: string,
                   eventLabel: string = null,
                   eventValue: number = null) {
    if (environment.production && window['ga']) {
      ga('send', 'event', {
        eventCategory: eventCategory,
        eventLabel: eventLabel,
        eventAction: eventAction,
        eventValue: eventValue
      });
    }
  }
}
