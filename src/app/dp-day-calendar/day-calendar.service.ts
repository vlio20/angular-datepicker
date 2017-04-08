import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {WeekDays} from '../common/types/week-days.type';
import {UtilsService} from '../common/services/utils/utils.service';
import {ICalendarDay} from './day.model';
import {ICalendarMonthConfig} from './day-calendar-config.model';

@Injectable()
export class CalendarMonthService {
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  constructor(private utilsService: UtilsService) {
  }

  generateDaysIndexMap(firstDayOfWeek: WeekDays) {
    const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
    const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
    return daysArr.reduce((map, day, index) => {
      map[index] = day;
      return map;
    }, <{[key: number]: string}>{});
  }

  generateDaysMap(firstDayOfWeek: WeekDays) {
    const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
    const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
    return daysArr.reduce((map, day, index) => {
      map[day] = index;
      return map;
    }, <{[key: number]: string}>{});
  }

  generateMonthArray(config: ICalendarMonthConfig,
                     selectedDays: Moment[] = null): ICalendarDay[][] {
    const dayInMonth = config.month;
    let monthArray: ICalendarDay[][] = [];
    const firstDayOfMonth = dayInMonth.clone().startOf('month');
    const firstDayOfWeekIndex = this.DAYS.indexOf(config.firstDayOfWeek);

    const firstDayOfBoard = firstDayOfMonth;
    while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
      firstDayOfBoard.subtract(1, 'day');
    }

    const current = firstDayOfBoard.clone();
    const daysOfCalendar: ICalendarDay[] = this.utilsService.createArray(42).reduce((array: ICalendarDay[]) => {
      array.push({
        date: current.clone(),
        selected: (selectedDays ? selectedDays
            .find(selectedDay => current.isSame(selectedDay, 'day')) : undefined) !== undefined,
        currentMonth: current.isSame(dayInMonth, 'month'),
        prevMonth: current.isSame(dayInMonth.clone().subtract(1, 'month'), 'month'),
        nextMonth: current.isSame(dayInMonth.clone().add(1, 'month'), 'month'),
        currentDay: current.isSame(moment(), 'day')
      });
      current.add(1, 'd');
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
      monthArray = this.removeNearMonthWeeks(dayInMonth, monthArray);
    }

    return monthArray;
  }

  private removeNearMonthWeeks(currentMonth: Moment, monthArray: ICalendarDay[][]): ICalendarDay[][] {
    if (monthArray[monthArray.length - 1].find((day) => day.date.isSame(currentMonth, 'month'))) {
      return monthArray;
    } else {
      return monthArray.slice(0, -1);
    }
  }

  generateWeekdays(firstDayOfWeek: WeekDays, weekdayNames: {[key: string]: string}): string[] {
    const weekdays: string[] = [];
    const daysMap = this.generateDaysMap(firstDayOfWeek);

    for (const dayKey in daysMap) {
      if (daysMap.hasOwnProperty(dayKey)) {
        weekdays[daysMap[dayKey]] = weekdayNames[dayKey];
      }
    }

    return weekdays;
  }

  isDateDisabled(day: ICalendarDay, config: ICalendarMonthConfig): boolean {
    if (config.isDisabledCallback) {
      return config.isDisabledCallback(day.date);
    }

    if (config.min && day.date.isBefore(config.min, 'day')) {
      return true;
    }

    return !!(config.max && day.date.isAfter(config.max, 'day'));
  }
}
