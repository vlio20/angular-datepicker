import {Injectable} from '@angular/core';
import {IDayPickerConfig} from './day-picker-config.model';
import * as moment from 'moment';
import {UtilsService} from '../../common/services/utils/utils.service';
import {ICalendarConfig} from '../../ob-calendar/config/calendar-config.model';
import {Moment} from 'moment';

@Injectable()
export class DayPickerService {
  private defaultConfig: IDayPickerConfig = {
    firstDayOfWeek: 'su',
    calendarsAmount: 1,
    format: 'DD-MM-YYYY',
    closeOnSelect: true,
    closeOnSelectDelay: 100,
    weekdayNames: {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    }
  };

  // private formatValues(config: IDayPickerConfig): void {
  //   const {selected, format} = config;
  // }

  getConfig(config: IDayPickerConfig) {
    const _config = Object.assign({}, this.defaultConfig, config);
    // this.formatValues(config);
    return _config;
  }

  generateCalendars(config: IDayPickerConfig, selected: Moment, month?: Moment): ICalendarConfig[] {
    const base = (month && month.clone()) || (selected && selected.clone()) || moment();
    return UtilsService.createArray(config.calendarsAmount).map((n: number, i: number) => ({
      month: base.add(i, 'month').clone(),
      selected: selected,
      firstDayOfWeek: config.firstDayOfWeek,
      weekdayNames: config.weekdayNames,
      min: config.min,
      max: config.max
    }));
  }

  isDateValid(date: string, format: string): boolean {
    return moment(date, format, true).isValid();
  }

  moveCalendars(config: IDayPickerConfig, selected: Moment, base: Moment, months: number): ICalendarConfig[] {
    const month = base.clone().add(months, 'month');
    return this.generateCalendars(config, selected, month);
  }

  isMinMonth(min: Moment, month): boolean {
    return month.clone().subtract(1, 'month').isBefore(min, 'month');
  }

  isMaxMonth(max: Moment, month): boolean {
    return month.clone().add(1, 'month').isAfter(max, 'month');
  }
}
