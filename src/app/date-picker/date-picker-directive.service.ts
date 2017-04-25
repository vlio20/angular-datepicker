import {IDatePickerDirectiveConfig} from './date-picker-directive-config.model';
import {ElementRef, Injectable} from '@angular/core';

@Injectable()
export class DatePickerDirectiveService {
  getConfig(config: IDatePickerDirectiveConfig = {}, attachTo?: ElementRef | string): IDatePickerDirectiveConfig {
    const baseConfig = { hideInputContainer: true };

    if (typeof attachTo === 'string') {
      return { ...config, ...baseConfig, ...{ inputElementContainer: attachTo } };
    } else if (attachTo) {
      return { ...config, ...baseConfig, ...{ inputElementContainer: attachTo.nativeElement } };
    }

    return { ...config, ...baseConfig };
  }
}
