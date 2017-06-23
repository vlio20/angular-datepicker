import {Injectable} from '@angular/core';
import {Moment} from 'moment';

import {UtilsService} from '../common/services/utils/utils.service';
import {ITimeSelectConfig} from './time-select-config.model';

export type TimeUnit = 'hour' | 'minute' | 'second';
export const FIRST_PM_HOUR = 12;

@Injectable()
export class TimeSelectService {
  readonly DEFAULT_CONFIG: ITimeSelectConfig = {
    hours12Format: 'hh',
    hours24Format: 'HH',
    meridiemFormat: 'A',
    minutesFormat: 'mm',
    minutesInterval: 1,
    secondsFormat: 'ss',
    secondsInterval: 1,
    showSeconds: false,
    showTwentyFourHours: false,
    timeSeparator: ':',
  };

  constructor(private utilsService: UtilsService) {
  }

  getConfig(config: ITimeSelectConfig): ITimeSelectConfig {
    return {...this.DEFAULT_CONFIG, ...this.utilsService.clearUndefined(config)};
  }

  getTimeFormat(config: ITimeSelectConfig): string {
    return (config.showTwentyFourHours ? config.hours24Format : config.hours12Format)
      + config.timeSeparator + config.minutesFormat
      + (config.showSeconds ? (config.timeSeparator + config.secondsFormat) : '')
      + (config.showTwentyFourHours ? '' : ' ' + config.meridiemFormat);
  }

  getHours(config: ITimeSelectConfig, time: Moment): string {
    return time.format(config.showTwentyFourHours ? config.hours24Format : config.hours12Format);
  }

  getMinutes(config: ITimeSelectConfig, time: Moment): string {
    return time.format(config.minutesFormat);
  }

  getSeconds(config: ITimeSelectConfig, time: Moment): string {
    return time.format(config.secondsFormat);
  }

  getMeridiem(config: ITimeSelectConfig, time: Moment): string {
    return time.format(config.meridiemFormat);
  }

  decrease(config: ITimeSelectConfig, time: Moment, unit: TimeUnit): Moment {
    let amount: number = 1;
    switch (unit) {
      case 'minute':
        amount = config.minutesInterval;
        break;
      case 'second':
        amount = config.secondsInterval;
        break;
    }
    return time.clone().subtract(amount, unit);
  }

  increase(config: ITimeSelectConfig, time: Moment, unit: TimeUnit): Moment {
    let amount: number = 1;
    switch (unit) {
      case 'minute':
        amount = config.minutesInterval;
        break;
      case 'second':
        amount = config.secondsInterval;
        break;
    }
    return time.clone().add(amount, unit);
  }

  toggleMeridiem(time: Moment): Moment {
    if (time.hours() < FIRST_PM_HOUR) {
      return time.clone().add(12, 'hour');
    } else {
      return time.clone().subtract(12, 'hour');
    }
  }

  shouldShowDecrease(config: ITimeSelectConfig, time: Moment, unit: TimeUnit): boolean {
    if (!config.min) {
      return true;
    };
    const newTime = this.decrease(config, time, unit);
    return config.min.isSameOrBefore(newTime);
  }

  shouldShowIncrease(config: ITimeSelectConfig, time: Moment, unit: TimeUnit): boolean {
    if (!config.max) {
      return true;
    };
    const newTime = this.increase(config, time, unit);
    return config.max.isSameOrAfter(newTime);
  }

  shouldShowToggleMeridiem(config: ITimeSelectConfig, time: Moment): boolean {
    if (!config.min && !config.max) {
      return true;
    }
    const newTime = this.toggleMeridiem(time);
    return (!config.max || config.max.isSameOrAfter(newTime))
      && (!config.min || config.min.isSameOrBefore(newTime));
  }
}
