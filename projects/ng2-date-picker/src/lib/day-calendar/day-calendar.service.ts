import {Injectable} from '@angular/core';

import {WeekDays} from '../common/types/week-days.type';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDay} from './day.model';
import {IDayCalendarConfig, IDayCalendarConfigInternal} from './day-calendar-config.model';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';
import {Dayjs} from 'dayjs';
import {dayjsRef} from '../common/dayjs/dayjs.ref';

@Injectable({
  providedIn: 'root'
})
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
    dayBtnFormat: 'DD',
    unSelectOnClick: true
  };
  private readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  constructor(private utilsService: UtilsService) {
  }

  getConfig(config: IDayCalendarConfig): IDayCalendarConfigInternal {
    const _config = {
      ...this.DEFAULT_CONFIG,
      ...this.utilsService.clearUndefined(config)
    };

    this.utilsService.convertPropsToDayjs(_config, _config.format, ['min', 'max']);

    return _config as IDayCalendarConfigInternal;
  }

  generateDaysMap(firstDayOfWeek: WeekDays) {
    const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
    const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
    return daysArr.reduce((map, day, index) => {
      map[day] = index;

      return map;
    }, <{[key: string]: number}>{});
  }

  generateMonthArray(config: IDayCalendarConfigInternal, month: Dayjs, selected: Dayjs[]): IDay[][] {
    const parsedMonth = month.isValid() ? dayjsRef(month.toDate()) : dayjsRef();
    let monthArray: IDay[][] = [];
    const firstDayOfWeekIndex = this.DAYS.indexOf(config.firstDayOfWeek);
    let firstDayOfBoard = parsedMonth.startOf('month');

    while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
      firstDayOfBoard = firstDayOfBoard.subtract(1, 'day');
    }

    let current = dayjsRef(firstDayOfBoard.toDate());
    const prevMonth = parsedMonth.subtract(1, 'month');
    const nextMonth = parsedMonth.add(1, 'month');
    const today = dayjsRef();

    const daysOfCalendar: IDay[] = this.utilsService.createArray(42)
      .reduce((array: IDay[]) => {
        array.push({
          date: dayjsRef(current.toDate()),
          selected: !!selected.find(selectedDay => current.isSame(selectedDay, 'day')),
          currentMonth: current.isSame(parsedMonth, 'month'),
          prevMonth: current.isSame(prevMonth, 'month'),
          nextMonth: current.isSame(nextMonth, 'month'),
          currentDay: current.isSame(today, 'day'),
          disabled: this.isDateDisabled(current, config)
        });
        current = current.add(1, 'day');

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
      monthArray = this.removeNearMonthWeeks(parsedMonth, monthArray);
    }

    return monthArray;
  }

  generateWeekdays(firstDayOfWeek: WeekDays): Dayjs[] {
    const weekdayNames: {[key: string]: Dayjs} = {
      su: dayjsRef().day(0),
      mo: dayjsRef().day(1),
      tu: dayjsRef().day(2),
      we: dayjsRef().day(3),
      th: dayjsRef().day(4),
      fr: dayjsRef().day(5),
      sa: dayjsRef().day(6)
    };
    const weekdays: Dayjs[] = [];
    const daysMap = this.generateDaysMap(firstDayOfWeek);

    for (const dayKey in daysMap) {
      if (daysMap.hasOwnProperty(dayKey)) {
        weekdays[daysMap[dayKey]] = weekdayNames[dayKey];
      }
    }

    return weekdays;
  }

  isDateDisabled(date: Dayjs, config: IDayCalendarConfigInternal): boolean {
    if (config.isDayDisabledCallback) {
      return config.isDayDisabledCallback(date);
    }

    if (config.min && date.isBefore(config.min, 'day')) {
      return true;
    }

    return !!(config.max && date.isAfter(config.max, 'day'));
  }

  // todo:: add unit tests
  getHeaderLabel(config: IDayCalendarConfigInternal, month: Dayjs): string {
    if (config.monthFormatter) {
      return config.monthFormatter(month);
    }

    return month.format(config.monthFormat);
  }

  // todo:: add unit tests
  shouldShowLeft(min: Dayjs, currentMonthView: Dayjs): boolean {
    return min ? min.isBefore(currentMonthView, 'month') : true;
  }

  // todo:: add unit tests
  shouldShowRight(max: Dayjs, currentMonthView: Dayjs): boolean {
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
      yearFormat: componentConfig.yearFormat,
      yearFormatter: componentConfig.yearFormatter,
      monthBtnFormat: componentConfig.monthBtnFormat,
      monthBtnFormatter: componentConfig.monthBtnFormatter,
      monthBtnCssClassCallback: componentConfig.monthBtnCssClassCallback,
      isMonthDisabledCallback: componentConfig.isMonthDisabledCallback,
      multipleYearsNavigateBy: componentConfig.multipleYearsNavigateBy,
      showMultipleYearsNavigation: componentConfig.showMultipleYearsNavigation,
      showGoToCurrent: componentConfig.showGoToCurrent,
      numOfMonthRows: componentConfig.numOfMonthRows
    });
  }

  getDayBtnText(config: IDayCalendarConfigInternal, day: Dayjs): string {
    if (config.dayBtnFormatter) {
      return config.dayBtnFormatter(day);
    }

    return day.format(config.dayBtnFormat);
  }

  getDayBtnCssClass(config: IDayCalendarConfigInternal, day: Dayjs): string {
    if (config.dayBtnCssClassCallback) {
      return config.dayBtnCssClassCallback(day);
    }

    return '';
  }

  private removeNearMonthWeeks(currentMonth: Dayjs, monthArray: IDay[][]): IDay[][] {
    if (monthArray[monthArray.length - 1].find((day) => day.date.isSame(currentMonth, 'month'))) {
      return monthArray;
    } else {
      return monthArray.slice(0, -1);
    }
  }
}
