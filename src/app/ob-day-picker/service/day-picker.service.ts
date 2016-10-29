import {Injectable} from '@angular/core';
import {IDayPickerConfig} from './day-picker-config.model';
import * as moment from 'moment';
import {UtilsService} from '../../common/services/utils/utils.service';
import {ICalendarConfig} from '../../ob-calendar/config/calendar-config.model';
import {Moment} from 'moment';
import {FormControl} from '@angular/forms';

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
    },
    disableKeypress: false
  };

  private formatValues(config: IDayPickerConfig): void {
    const {format, min, max} = config;

    if (min && typeof min === 'string') {
      config.min = moment(min, format);
    }

    if (max && typeof max === 'string') {
      config.max = moment(max, format);
    }
  }

  getConfig(config: IDayPickerConfig) {
    const _config = Object.assign({}, this.defaultConfig, config);
    this.formatValues(_config);
    return _config;
  }

  generateCalendars(config: IDayPickerConfig, selected: Moment, month?: Moment): ICalendarConfig[] {
    const base = (month && month.clone()) || (selected && selected.clone()) || moment();
    return UtilsService.createArray(config.calendarsAmount).map((n: number, i: number) => ({
      month: base.clone().add(i, 'month'),
      selected: selected,
      firstDayOfWeek: config.firstDayOfWeek,
      weekdayNames: config.weekdayNames,
      min: <Moment>config.min,
      max: <Moment>config.max
    }));
  }

  isDateValid(date: string, format: string): boolean {
    if (date === '') {
      return true;
    }
    return moment(date, format, true).isValid();
  }

  moveCalendars(config: IDayPickerConfig, selected: Moment, base: Moment, months: number): ICalendarConfig[] {
    const month = base.clone().add(months, 'month');
    return this.generateCalendars(config, selected, month);
  }

  isMinMonth(min: Moment, month): boolean {
    return min ? month.clone().subtract(1, 'month').isBefore(min, 'month') : false;
  }

  isMaxMonth(max: Moment, month): boolean {
    return max ? month.clone().add(1, 'month').isAfter(max, 'month') : false;
  }

  createValidator({minDate, maxDate}, dateFormat: string) {
    let isValid: boolean;
    let value: Moment;
    const validators = [];

    if (minDate) {
      validators.push({
        key: 'minDate',
        isValid: () => {
          const _isValid = value.isSameOrAfter(minDate, 'day');
          isValid = isValid ? _isValid : false;
          return _isValid;
        }
      });
    }

    if (maxDate) {
      validators.push({
        key: 'maxDate',
        isValid: () => {
          const _isValid = value.isSameOrBefore(maxDate, 'day');
          isValid = isValid ? _isValid : false;
          return _isValid;
        }
      });
    }

    return function validateInput(c: FormControl) {
      isValid = true;

      if (c.value) {
        value = typeof c.value === 'string' ? moment(c.value, dateFormat) : c.value;
      } else {
        return null;
      }

      if (!value.isValid()) {
        return {
          format: {
            given: c.value
          }
        };
      }

      const errors = validators.reduce((map, err) => {
        if (!err.isValid()) {
          map[err.key] = {
            given: value
          };
        }

        return map;
      }, <any>{});

      return !isValid ? errors : null;
    };
  }
}