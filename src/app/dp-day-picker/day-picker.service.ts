import {CalendarService} from '../dp-calendar/calendar.service';
import {Injectable, EventEmitter} from '@angular/core';
import {IDayPickerConfig} from './day-picker-config.model';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {FormControl} from '@angular/forms';
import {ICalendarConfig} from '../dp-calendar/calendar-config.model';

@Injectable()
export class DayPickerService {
  readonly onPickerClosed: EventEmitter<null> = new EventEmitter();
  private defaultConfig: IDayPickerConfig = {
    closeOnSelect: true,
    closeOnSelectDelay: 100,
    format: 'DD-MM-YYYY',
    onOpenDelay: 0,
    disableKeypress: false,
    showNearMonthDays: true,
    drops: 'down',
    opens: 'right',
    showWeekNumbers: false,
    enableMonthSelector: true,
    showGoToCurrent: true
  };

  static isDateValid(date: string, format: string): boolean {
    if (date === '') {
      return true;
    }

    return moment(date, format, true).isValid();
  }

  constructor(private calendarContainerService: CalendarService,
              private utilsService: UtilsService) {
  }

  getConfig(config: IDayPickerConfig): ICalendarConfig {
    const _config = Object.assign({}, this.defaultConfig, config);

    if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
      _config.closeOnSelect = false;
    }

    return this.calendarContainerService.getConfig(_config);
  }

  createValidator({minDate, maxDate}, dateFormat: string): (FormControl, string) => {[key: string]: any} {
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

    return function validateInput(formControl: FormControl, format: string) {
      isValid = true;

      if (formControl.value) {
        if (typeof formControl.value === 'string') {
          const dateStrings = formControl.value.split(',').map(date => date.trim());
          const validDateStrings = dateStrings
            .filter(date => DayPickerService.isDateValid(date, format));
          value = validDateStrings.map(dateString => moment(dateString, dateFormat));
        } else if (!Array.isArray(formControl.value)) {
          value = [formControl.value];
        } else {
          value = formControl.value.map(val => this.utilsService.convertToMoment(val, dateFormat));
        }
      } else {
        return null;
      }

      if (!value.every(val => val.isValid())) {
        return {
          format: {
            given: formControl.value
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

  pickerClosed() {
    this.onPickerClosed.emit();
  }
}
