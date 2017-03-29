import {UtilsService} from '../common/services/utils/utils.service';
import {ICalendarMonthConfig} from '../dp-calendar-month/calendar-month-config.model';
import {ICalendarConfig} from './calendar-config.model';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Injectable()
export class CalendarService {
  private defaultConfig: ICalendarConfig = {
    firstDayOfWeek: 'su',
    calendarsAmount: 1,
    monthFormat: 'MMM, YYYY',
    showNearMonthDays: true,
    weekdayNames: {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    },
  };

  private formatValues(config: ICalendarConfig): void {
    const {format, min, max} = config;

    if (min && typeof min === 'string') {
      config.min = moment(min, format);
    }

    if (max && typeof max === 'string') {
      config.max = moment(max, format);
    }
  }

  getConfig(config: ICalendarConfig): ICalendarConfig {
    const _config = Object.assign({}, this.defaultConfig, config);
    this.formatValues(_config);

    return _config;
  }

  generateCalendars(config: ICalendarConfig, selected: Moment[], month?: Moment): ICalendarMonthConfig[] {
    const base = (month && month.clone()) || (selected && selected[0] && selected[0].clone()) || moment();
    return UtilsService.createArray(config.calendarsAmount)
      .map((n: number, i: number) => ({
        month: base.clone().add(i, 'month'),
        selected: selected,
        firstDayOfWeek: config.firstDayOfWeek,
        weekdayNames: config.weekdayNames,
        min: <Moment>config.min,
        max: <Moment>config.max,
        showNearMonthDays: config.showNearMonthDays,
        showWeekNumbers: config.showWeekNumbers
      }));
  }

  isDateValid(date: string, format: string): boolean {
    if (date === '') {
      return true;
    }
    return moment(date, format, true).isValid();
  }

  moveCalendars(config: ICalendarConfig, selected: Moment[], base: Moment, months: number): ICalendarMonthConfig[] {
    const month = base.clone().add(months, 'month');
    return this.generateCalendars(config, selected, month);
  }

  isMinMonth(min: Moment, month): boolean {
    return min ? month.clone().subtract(1, 'month').isBefore(min, 'month') : false;
  }

  isMaxMonth(max: Moment, month): boolean {
    return max ? month.clone().add(1, 'month').isAfter(max, 'month') : false;
  }
}
