import {EventEmitter, Injectable} from '@angular/core';
import {IDatePickerConfig, IDatePickerConfigInternal} from './date-picker-config.model';
import * as momentNs from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';
import {TimeSelectService} from '../time-select/time-select.service';
import {DayTimeCalendarService} from '../day-time-calendar/day-time-calendar.service';
import {ITimeSelectConfig} from '../time-select/time-select-config.model';
import {CalendarMode} from '../common/types/calendar-mode';

const moment = momentNs;

@Injectable()
export class DatePickerService {
  readonly onPickerClosed: EventEmitter<null> = new EventEmitter();
  private defaultConfig: IDatePickerConfigInternal = {
    closeOnSelect: true,
    closeOnSelectDelay: 100,
    closeOnEnter: true,
    format: 'DD-MM-YYYY',
    openOnFocus: true,
    openOnClick: true,
    onOpenDelay: 0,
    disableKeypress: false,
    showNearMonthDays: true,
    showWeekNumbers: false,
    enableMonthSelector: true,
    showGoToCurrent: true,
    locale: moment.locale(),
    hideOnOutsideClick: true
  };

  constructor(private utilsService: UtilsService,
              private timeSelectService: TimeSelectService,
              private daytimeCalendarService: DayTimeCalendarService) {
  }

  // todo:: add unit tests
  getConfig(config: IDatePickerConfig, mode: CalendarMode = 'daytime'): IDatePickerConfigInternal {
    const _config = <IDatePickerConfigInternal>{
      ...this.defaultConfig,
      format: this.getDefaultFormatByMode(mode),
      ...this.utilsService.clearUndefined(config)
    };

    this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);

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
      weekDayFormatter: pickerConfig.weekDayFormatter,
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
      dayBtnCssClassCallback: pickerConfig.dayBtnCssClassCallback,
      monthBtnFormat: pickerConfig.monthBtnFormat,
      monthBtnFormatter: pickerConfig.monthBtnFormatter,
      monthBtnCssClassCallback: pickerConfig.monthBtnCssClassCallback,
      multipleYearsNavigateBy: pickerConfig.multipleYearsNavigateBy,
      showMultipleYearsNavigation: pickerConfig.showMultipleYearsNavigation,
      locale: pickerConfig.locale,
      returnedValueType: pickerConfig.returnedValueType,
      showGoToCurrent: pickerConfig.showGoToCurrent,
      unSelectOnClick: pickerConfig.unSelectOnClick,
      numOfMonthRows: pickerConfig.numOfMonthRows
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
    const datesStrArr: string[] = this.utilsService.datesStringToStringArray(value);

    return datesStrArr.every(date => this.utilsService.isDateValid(date, config.format));
  }

  // todo:: add unit tests
  convertInputValueToMomentArray(value: string, config: IDatePickerConfig): Moment[] {
    value = value ? value : '';
    const datesStrArr: string[] = this.utilsService.datesStringToStringArray(value);

    return this.utilsService.convertToMomentArray(datesStrArr, config);
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
