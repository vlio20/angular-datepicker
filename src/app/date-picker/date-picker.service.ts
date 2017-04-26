import {Injectable, EventEmitter} from '@angular/core';
import {IDatePickerConfig} from './date-picker-config.model';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {FormControl} from '@angular/forms';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';

@Injectable()
export class DatePickerService {
  readonly onPickerClosed: EventEmitter<null> = new EventEmitter();
  private defaultConfig: IDatePickerConfig = {
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

  constructor(private utilsService: UtilsService) {
  }

  // todo:: add unit tests
  getConfig(config: IDatePickerConfig): IDatePickerConfig {
    const _config: IDatePickerConfig = {...this.defaultConfig, ...this.utilsService.clearUndefined(config)};
    const {min, max, format} = _config;
    if (min) {
      _config.min = this.utilsService.convertToMoment(min, format);
    }

    if (max) {
      _config.max = this.utilsService.convertToMoment(max, format);
    }

    if (config && config.allowMultiSelect && config.closeOnSelect === undefined) {
      _config.closeOnSelect = false;
    }

    return _config;
  }

  getDayConfigService(pickerConfig: IDatePickerConfig): IDayCalendarConfig {
    return {
      min: pickerConfig.min,
      max: pickerConfig.max,
      isDayDisabledCallback: pickerConfig.isDayDisabledCallback,
      weekdayNames: pickerConfig.weekdayNames,
      showNearMonthDays: pickerConfig.showNearMonthDays,
      showWeekNumbers: pickerConfig.showWeekNumbers,
      firstDayOfWeek: pickerConfig.firstDayOfWeek,
      format: pickerConfig.format,
      allowMultiSelect: pickerConfig.allowMultiSelect,
      monthFormat: pickerConfig.monthFormat,
      monthFormatter: pickerConfig.monthFormatter,
      enableMonthSelector: pickerConfig.enableMonthSelector,
      yearFormat: pickerConfig.yearFormat,
      yearFormatter: pickerConfig.yearFormatter,
      dayBtnFormat: pickerConfig.dayBtnFormat,
      dayBtnFormatter: pickerConfig.dayBtnFormatter,
      monthBtnFormat: pickerConfig.monthBtnFormat,
      monthBtnFormatter: pickerConfig.monthBtnFormatter
    };
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
            .filter(date => this.utilsService.isDateValid(date, format));
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

  // todo:: add unit tests
  isValidInputDateValue(value: string, config: IDatePickerConfig): boolean {
    value = value ? value : '';
    let datesStrArr: string[];

    if (config.allowMultiSelect) {
      datesStrArr = value.split(',');
    } else {
      datesStrArr = [value];
    }

    return datesStrArr.every(date => this.utilsService.isDateValid(date, config.format));
  }

  // todo:: add unit tests
  convertInputValueToMomentArray(value: string, config: IDatePickerConfig): Moment[] {
    value = value ? value : '';
    let datesStrArr: string[];

    if (config.allowMultiSelect) {
      datesStrArr = value.split(',');
    } else {
      datesStrArr = [value];
    }

    return this.utilsService.convertToMomentArray(datesStrArr, config.format, config.allowMultiSelect);
  }
}
