import {EventEmitter, Injectable} from '@angular/core';
import {IDatePickerConfig} from './date-picker-config.model';
import {Moment} from 'moment';
import * as moment from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';
import {TimeSelectService} from '../time-select/time-select.service';
import {DayTimeCalendarService} from '../day-time-calendar/day-time-calendar.service';
import {ITimeSelectConfig} from '../time-select/time-select-config.model';
import {CalendarMode} from '../common/types/calendar-mode';

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
    showGoToCurrent: true,
    locale: 'en'
  };

  constructor(private utilsService: UtilsService,
              private timeSelectService: TimeSelectService,
              private daytimeCalendarService: DayTimeCalendarService) {
  }

  // todo:: add unit tests
  getConfig(config: IDatePickerConfig, mode: CalendarMode = 'daytime'): IDatePickerConfig {
    const _config: IDatePickerConfig = {
      ...this.defaultConfig,
      format: this.getDefaultFormatByMode(mode),
      ...this.utilsService.clearUndefined(config)
    };

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

    moment.locale(_config.locale);

    return _config;
  }

  getDayConfigService(pickerConfig: IDatePickerConfig): IDayCalendarConfig {
    return {
      min: pickerConfig.min,
      max: pickerConfig.max,
      isDayDisabledCallback: pickerConfig.isDayDisabledCallback,
      weekDayFormat: pickerConfig.weekDayFormat,
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
      monthBtnFormatter: pickerConfig.monthBtnFormatter,
      multipleYearsNavigateBy: pickerConfig.multipleYearsNavigateBy,
      showMultipleYearsNavigation: pickerConfig.showMultipleYearsNavigation,
      locale: pickerConfig.locale
    };
  }

  getDayTimeConfigService(pickerConfig: IDatePickerConfig): ITimeSelectConfig {
    return this.daytimeCalendarService.getConfig(pickerConfig);
  }

  getTimeConfigService(pickerConfig: IDatePickerConfig): ITimeSelectConfig {
    return this.timeSelectService.getConfig(pickerConfig);
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

  private getDefaultFormatByMode(mode: CalendarMode): string {
    switch (mode) {
      case 'day':
        return 'DD-MM-YYYY';
      case 'daytime':
        return 'DD-MM-YYYY HH:mm:ss';
      case 'time':
        return 'HH:mm:ss';
      case 'month':
        return 'MMM, YYYY';
    }
  }
}
