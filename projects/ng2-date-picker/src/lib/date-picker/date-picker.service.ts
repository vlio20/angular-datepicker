import {EventEmitter, Injectable} from '@angular/core';
import {IDatePickerConfig, IDatePickerConfigInternal} from './date-picker-config.model';

import {UtilsService} from '../common/services/utils/utils.service';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';
import {TimeSelectService} from '../time-select/time-select.service';
import {DayTimeCalendarService} from '../day-time-calendar/day-time-calendar.service';
import {ITimeSelectConfig} from '../time-select/time-select-config.model';
import {CalendarMode} from '../common/types/calendar-mode';
import {Dayjs} from 'dayjs';
import {IDayTimeCalendarConfig} from '../day-time-calendar/day-time-calendar-config.model';
import {ConnectionPositionPair} from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
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
    hideOnOutsideClick: true,
  };

  constructor(private readonly utilsService: UtilsService,
              private readonly timeSelectService: TimeSelectService,
              private readonly daytimeCalendarService: DayTimeCalendarService) {
  }

  // todo:: add unit tests
  getConfig(config: IDatePickerConfig, mode: CalendarMode = 'daytime'): IDatePickerConfigInternal {
    const _config = <IDatePickerConfigInternal>{
      ...this.defaultConfig,
      format: DatePickerService.getDefaultFormatByMode(mode),
      ...this.utilsService.clearUndefined(config)
    };

    this.utilsService.convertPropsToDayjs(_config, _config.format, ['min', 'max']);

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
      isMonthDisabledCallback: pickerConfig.isMonthDisabledCallback,
      multipleYearsNavigateBy: pickerConfig.multipleYearsNavigateBy,
      showMultipleYearsNavigation: pickerConfig.showMultipleYearsNavigation,
      returnedValueType: pickerConfig.returnedValueType,
      showGoToCurrent: pickerConfig.showGoToCurrent,
      unSelectOnClick: pickerConfig.unSelectOnClick,
      numOfMonthRows: pickerConfig.numOfMonthRows
    };
  }

  getDayTimeConfig(pickerConfig: IDatePickerConfig): IDayTimeCalendarConfig {
    return this.daytimeCalendarService.getConfig(pickerConfig);
  }

  getTimeConfig(pickerConfig: IDatePickerConfig): ITimeSelectConfig {
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
  convertInputValueToDayjsArray(value: string, config: IDatePickerConfig): Dayjs[] {
    value = value ? value : '';
    const datesStrArr: string[] = this.utilsService.datesStringToStringArray(value);

    return this.utilsService.convertToDayjsArray(datesStrArr, config);
  }

  getOverlayPosition({drops, opens}: IDatePickerConfig):  ConnectionPositionPair[] | undefined {
    if (!drops && !opens) {
      return undefined;
    }

    return [{
      originX: opens ? opens === 'left' ? 'start' : 'end' : 'start',
      originY:  drops ? drops === 'up' ? 'top' : 'bottom' : 'bottom',
      overlayX: opens ? opens === 'left' ? 'start' : 'end' : 'start',
      overlayY: drops ? drops === 'up' ? 'bottom' : 'top' : 'top',
    }];
  }

  private static getDefaultFormatByMode(mode: CalendarMode): string {
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
