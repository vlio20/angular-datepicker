import {Injectable} from '@angular/core';
import * as momentNs from 'moment';
import {Moment} from 'moment';
import {WeekDays} from '../common/types/week-days.type';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDay} from './day.model';
import {IDayCalendarConfig, IDayCalendarConfigInternal} from './day-calendar-config.model';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';

const moment = momentNs;

@Injectable()
export class DayCalendarService {
  readonly DEFAULT_CONFIG: IDayCalendarConfig = {
    showNearMonthDays: true,
    showWeekNumbers: false,
    firstDayOfWeek: 'su',
    weekDayFormat: 'ddd',
    format: 'DD-MM-YYYY',
    allowMultiSelect: false,
    monthFormat: 'MMM, YYYY',
    enableMonthSelector: true,
    locale: moment.locale(),
    dayBtnFormat: 'DD',
    unSelectOnClick: true
  };
  private readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  constructor(private utilsService: UtilsService) {
  }

  getConfig(config: IDayCalendarConfig): IDayCalendarConfigInternal {
    const _config = <IDayCalendarConfigInternal>{
      ...this.DEFAULT_CONFIG,
      ...this.utilsService.clearUndefined(config)
    };

    this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);

    moment.locale(_config.locale);

    return _config;
  }

  generateDaysMap(firstDayOfWeek: WeekDays) {
    const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
    const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
    return daysArr.reduce((map, day, index) => {
      map[day] = index;

      return map;
    }, <{[key: string]: number}>{});
  }

  generateMonthArray(config: IDayCalendarConfigInternal, month: Moment, selected: Moment[]): IDay[][] {
    let monthArray: IDay[][] = [];
    const firstDayOfWeekIndex = this.DAYS.indexOf(config.firstDayOfWeek);
    const firstDayOfBoard = month.clone().startOf('month');

    while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
      firstDayOfBoard.subtract(1, 'day');
    }

    const current = firstDayOfBoard.clone();
    const prevMonth = month.clone().subtract(1, 'month');
    const nextMonth = month.clone().add(1, 'month');
    const today = moment();

    const daysOfCalendar: IDay[] = this.utilsService.createArray(42)
      .reduce((array: IDay[]) => {
        array.push({
          date: current.clone(),
          selected: !!selected.find(selectedDay => current.isSame(selectedDay, 'day')),
          currentMonth: current.isSame(month, 'month'),
          prevMonth: current.isSame(prevMonth, 'month'),
          nextMonth: current.isSame(nextMonth, 'month'),
          currentDay: current.isSame(today, 'day'),
          disabled: this.isDateDisabled(current, config)
        });
        current.add(1, 'day');

        return array;
      }, []);

    daysOfCalendar.forEach((day, index) => {
      const weekIndex = Math.floor(index / 7);

      if (!monthArray[weekIndex]) {
        monthArray.push([]);
      }

      monthArray[weekIndex].push(day);
    });

    if (!config.showNearMonthDays) {
      monthArray = this.removeNearMonthWeeks(month, monthArray);
    }

    return monthArray;
  }

  generateWeekdays(firstDayOfWeek: WeekDays): Moment[] {
    const weekdayNames: {[key: string]: Moment} = {
      su: moment().day(0),
      mo: moment().day(1),
      tu: moment().day(2),
      we: moment().day(3),
      th: moment().day(4),
      fr: moment().day(5),
      sa: moment().day(6)
    };
    const weekdays: Moment[] = [];
    const daysMap = this.generateDaysMap(firstDayOfWeek);

    for (const dayKey in daysMap) {
      if (daysMap.hasOwnProperty(dayKey)) {
        weekdays[daysMap[dayKey]] = weekdayNames[dayKey];
      }
    }

    return weekdays;
  }

  isDateDisabled(date: Moment, config: IDayCalendarConfigInternal): boolean {
    if (config.isDayDisabledCallback) {
      return config.isDayDisabledCallback(date);
    }

    if (config.min && date.isBefore(config.min, 'day')) {
      return true;
    }

    return !!(config.max && date.isAfter(config.max, 'day'));
  }

  // todo:: add unit tests
  getHeaderLabel(config: IDayCalendarConfigInternal, month: Moment): string {
    if (config.monthFormatter) {
      return config.monthFormatter(month);
    }

    return month.format(config.monthFormat);
  }

  // todo:: add unit tests
  shouldShowLeft(min: Moment, currentMonthView: Moment): boolean {
    return min ? min.isBefore(currentMonthView, 'month') : true;
  }

  // todo:: add unit tests
  shouldShowRight(max: Moment, currentMonthView: Moment): boolean {
    return max ? max.isAfter(currentMonthView, 'month') : true;
  }

  generateDaysIndexMap(firstDayOfWeek: WeekDays) {
    const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
    const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
    return daysArr.reduce((map, day, index) => {
      map[index] = day;

      return map;
    }, <{[key: number]: string}>{});
  }

  getMonthCalendarConfig(componentConfig: IDayCalendarConfigInternal): IMonthCalendarConfig {
    return this.utilsService.clearUndefined({
      min: componentConfig.min,
      max: componentConfig.max,
      format: componentConfig.format,
      isNavHeaderBtnClickable: true,
      allowMultiSelect: false,
      locale: componentConfig.locale,
      yearFormat: componentConfig.yearFormat,
      yearFormatter: componentConfig.yearFormatter,
      monthBtnFormat: componentConfig.monthBtnFormat,
      monthBtnFormatter: componentConfig.monthBtnFormatter,
      monthBtnCssClassCallback: componentConfig.monthBtnCssClassCallback,
      multipleYearsNavigateBy: componentConfig.multipleYearsNavigateBy,
      showMultipleYearsNavigation: componentConfig.showMultipleYearsNavigation,
      showGoToCurrent: componentConfig.showGoToCurrent,
      numOfMonthRows: componentConfig.numOfMonthRows
    });
  }

  getDayBtnText(config: IDayCalendarConfigInternal, day: Moment): string {
    if (config.dayBtnFormatter) {
      return config.dayBtnFormatter(day);
    }

    return day.format(config.dayBtnFormat);
  }

  getDayBtnCssClass(config: IDayCalendarConfigInternal, day: Moment): string {
    if (config.dayBtnCssClassCallback) {
      return config.dayBtnCssClassCallback(day);
    }

    return '';
  }

  private removeNearMonthWeeks(currentMonth: Moment, monthArray: IDay[][]): IDay[][] {
    if (monthArray[monthArray.length - 1].find((day) => day.date.isSame(currentMonth, 'month'))) {
      return monthArray;
    } else {
      return monthArray.slice(0, -1);
    }
  }
}
