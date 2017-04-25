import {IDatePickerDirectiveConfig} from './date-picker-directive-config.model';
import {ElementRef, Injectable} from '@angular/core';

@Injectable()
export class DatePickerDirectiveService {
  getConfig(config: IDatePickerDirectiveConfig = {}, attachTo?: ElementRef | string): IDatePickerDirectiveConfig {
    config.hideInputContainer = true;
    if (typeof attachTo === 'string') {
      config.inputElementContainer = attachTo;
    } else if (attachTo) {
      config.inputElementContainer = attachTo.nativeElement;
    }
    return config;
  }
}
