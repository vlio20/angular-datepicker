import {Injectable} from '@angular/core';
import {Moment} from 'moment';
import {WeekDays} from '../../common/types/week-days.type';
import {UtilsService} from '../../common/services/utils/utils.service';

@Injectable()
export class CalendarService {
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];

  constructor() {
  }

  generateDaysMap(firstDayOfWeek: WeekDays) {
    const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
    const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
    return daysArr.reduce((map, day, index) => {
      map[index] = day;
      return map;
    }, <{[key: number]: string}>{});
  }

  generateMonthArray(firstDayOfWeek: WeekDays, dayInMonth: Moment): Moment[][] {
    const monthArray: Moment[][] = [];
    const firstDayOfMonth = dayInMonth.clone().startOf('month');
    const firstDayOfWeekIndex = this.DAYS.indexOf(firstDayOfWeek);

    const firstDayOfBoard = firstDayOfMonth;
    while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
      firstDayOfBoard.subtract(1, 'day');
    }

    const current = firstDayOfBoard.clone();
    const daysOfCalendar: Moment[] = UtilsService.createArray(42).reduce((array: Moment[]) => {
      array.push(current.clone());
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

    return monthArray;
  }
}
