import {Injectable} from '@angular/core';
import * as momentNs from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {ITimeSelectConfig, ITimeSelectConfigInternal} from './time-select-config.model';
const moment = momentNs;

export type TimeUnit = 'hour' | 'minute' | 'second';
export const FIRST_PM_HOUR = 12;

@Injectable()
export class TimeSelectService {
  readonly DEFAULT_CONFIG: ITimeSelectConfigInternal = {
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
    locale: moment.locale()
  };

  constructor(private utilsService: UtilsService) {
  }

  getConfig(config: ITimeSelectConfig): ITimeSelectConfigInternal {
    const timeConfigs = {
      maxTime: this.utilsService.onlyTime(config && config.maxTime),
      minTime: this.utilsService.onlyTime(config && config.minTime)
    };

    const _config = <ITimeSelectConfigInternal>{
      ...this.DEFAULT_CONFIG,
      ...this.utilsService.clearUndefined(config),
      ...timeConfigs
    };

    moment.locale(_config.locale);

    return _config;
  }

  getTimeFormat(config: ITimeSelectConfigInternal): string {
    return (config.showTwentyFourHours ? config.hours24Format : config.hours12Format)
      + config.timeSeparator + config.minutesFormat
      + (config.showSeconds ? (config.timeSeparator + config.secondsFormat) : '')
      + (config.showTwentyFourHours ? '' : ' ' + config.meridiemFormat);
  }

  getHours(config: ITimeSelectConfigInternal, t: Moment | null): string {
    const time = t || moment();
    return time && time.format(config.showTwentyFourHours ? config.hours24Format : config.hours12Format);
  }

  getMinutes(config: ITimeSelectConfigInternal, t: Moment | null): string {
    const time = t || moment();
    return time && time.format(config.minutesFormat);
  }

  getSeconds(config: ITimeSelectConfigInternal, t: Moment | null): string {
    const time = t || moment();
    return time && time.format(config.secondsFormat);
  }

  getMeridiem(config: ITimeSelectConfigInternal, time: Moment): string {
    return time && time.format(config.meridiemFormat);
  }

  decrease(config: ITimeSelectConfigInternal, time: Moment, unit: TimeUnit): Moment {
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

  increase(config: ITimeSelectConfigInternal, time: Moment, unit: TimeUnit): Moment {
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

  shouldShowDecrease(config: ITimeSelectConfigInternal, time: Moment, unit: TimeUnit): boolean {
    if (!config.min && !config.minTime) {
      return true;
    }
    ;
    const newTime = this.decrease(config, time, unit);

    return (!config.min || config.min.isSameOrBefore(newTime))
      && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
  }

  shouldShowIncrease(config: ITimeSelectConfigInternal, time: Moment, unit: TimeUnit): boolean {
    if (!config.max && !config.maxTime) {
      return true;
    }
    ;
    const newTime = this.increase(config, time, unit);

    return (!config.max || config.max.isSameOrAfter(newTime))
      && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)));
  }

  shouldShowToggleMeridiem(config: ITimeSelectConfigInternal, time: Moment): boolean {
    if (!config.min && !config.max && !config.minTime && !config.maxTime) {
      return true;
    }
    const newTime = this.toggleMeridiem(time);
    return (!config.max || config.max.isSameOrAfter(newTime))
      && (!config.min || config.min.isSameOrBefore(newTime))
      && (!config.maxTime || config.maxTime.isSameOrAfter(this.utilsService.onlyTime(newTime)))
      && (!config.minTime || config.minTime.isSameOrBefore(this.utilsService.onlyTime(newTime)));
  }
}
