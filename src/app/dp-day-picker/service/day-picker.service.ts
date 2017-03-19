import {CalendarService} from './../../dp-calendar/config/calendar.service';
import {Injectable} from '@angular/core';
import {IDayPickerConfig} from './day-picker-config.model';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../../common/services/utils/utils.service';
import {FormControl} from '@angular/forms';
import {ICalendarConfig} from '../../dp-calendar/config/calendar-config.model';

@Injectable()
export class DayPickerService {
  private defaultConfig: IDayPickerConfig = {
    closeOnSelect: true,
    closeOnSelectDelay: 100,
    disableKeypress: false,
    drops: 'down',
    opens: 'right'
  };

  constructor(private calendarContainerService: CalendarService) {
  }

  getConfig(config: IDayPickerConfig): ICalendarConfig {
    const _config = Object.assign({}, this.defaultConfig, config);

    if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
      _config.closeOnSelect = false;
    }

    return this.calendarContainerService.getConfig(_config);
  }

  isDateValid(date: string, format: string): boolean {
    if (date === '') {
      return true;
    }

    return moment(date, format, true).isValid();
  }

  createValidator({minDate, maxDate}, dateFormat: string) {
    let isValid: boolean;
    let value: Moment[];
    const validators = [];

    if (minDate) {
      validators.push({
        key: 'minDate',
        isValid: () => {
          const _isValid = value.every(val => val.isSameOrAfter(minDate, 'day'));
          isValid = isValid ? _isValid : false;
          return _isValid;
        }
      });
    }

    if (maxDate) {
      validators.push({
        key: 'maxDate',
        isValid: () => {
          const _isValid = value.every(val => val.isSameOrBefore(maxDate, 'day'));
          isValid = isValid ? _isValid : false;
          return _isValid;
        }
      });
    }

    return function validateInput(c: FormControl) {
      isValid = true;

      if (c.value) {
        if (typeof c.value === 'string') {
          const dateStrings = c.value.split(',').map(date => date.trim());
          const validDateStrings = dateStrings.filter(date => this.dayPickerService.isDateValid(date, this.pickerConfig.format));
          value = validDateStrings.map(dateString => moment(dateString, dateFormat));
        } else if (!Array.isArray(c.value)) {
          value = [c.value];
        } else {
          value = c.value.map(val => UtilsService.convertToMoment(val, dateFormat));
        }
      } else {
        return null;
      }

      if (!value.every(val => val.isValid())) {
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
      }, {});

      return !isValid ? errors : null;
    };
  }
}
