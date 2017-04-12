import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {WeekDays} from '../common/types/week-days.type';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDay} from './day.model';
import {CalendarValue, ECalendarValue} from '../common/types/calendar-value';
import {FormControl} from '@angular/forms';
import {IDayCalendarConfig} from './day-calendar-config.model';

@Injectable()
export class DayCalendarService {
  readonly DAYS = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'];
  readonly DEFAULT_CONFIG: IDayCalendarConfig = {
    weekdayNames: {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    },
    showNearMonthDays: true,
    showWeekNumbers: false,
    firstDayOfWeek: 'su',
    format: 'DD-MM-YYYY',
    allowMultiSelect: false,
    monthFormat: 'MMM, YYYY'
  };

  constructor(private utilsService: UtilsService) {
  }

  private removeNearMonthWeeks(currentMonth: Moment, monthArray: IDay[][]): IDay[][] {
    if (monthArray[monthArray.length - 1].find((day) => day.date.isSame(currentMonth, 'month'))) {
      return monthArray;
    } else {
      return monthArray.slice(0, -1);
    }
  }

  getConfig(config: IDayCalendarConfig): IDayCalendarConfig {
    return {...this.DEFAULT_CONFIG, ...config};
  }

  generateDaysMap(firstDayOfWeek: WeekDays) {
    const firstDayIndex = this.DAYS.indexOf(firstDayOfWeek);
    const daysArr = this.DAYS.slice(firstDayIndex, 7).concat(this.DAYS.slice(0, firstDayIndex));
    return daysArr.reduce((map, day, index) => {
      map[day] = index;
      return map;
    }, <{[key: number]: string}>{});
  }

  generateMonthArray(config: IDayCalendarConfig, month: Moment, selected?: Moment[]): IDay[][] {
    let monthArray: IDay[][] = [];
    const firstDayOfMonth = month.clone().startOf('month');
    const firstDayOfWeekIndex = this.DAYS.indexOf(config.firstDayOfWeek);

    const firstDayOfBoard = firstDayOfMonth;
    while (firstDayOfBoard.day() !== firstDayOfWeekIndex) {
      firstDayOfBoard.subtract(1, 'day');
    }

    const current = firstDayOfBoard.clone();
    const daysOfCalendar: IDay[] = this.utilsService.createArray(42).reduce((array: IDay[]) => {
      array.push({
        date: current.clone(),
        selected: (selected ? selected
            .find(selectedDay => current.isSame(selectedDay, 'day')) : undefined) !== undefined,
        currentMonth: current.isSame(month, 'month'),
        prevMonth: current.isSame(month.clone().subtract(1, 'month'), 'month'),
        nextMonth: current.isSame(month.clone().add(1, 'month'), 'month'),
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
      monthArray = this.removeNearMonthWeeks(month, monthArray);
    }

    return monthArray;
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

  isDateDisabled(day: IDay, config: IDayCalendarConfig): boolean {
    if (config.isDisabledCallback) {
      return config.isDisabledCallback(day.date);
    }

    if (config.min && day.date.isBefore(config.min, 'day')) {
      return true;
    }

    return !!(config.max && day.date.isAfter(config.max, 'day'));
  }

  // todo:: add unit test
  getDefaultDisplayDate(currentMonthView: Moment, selected: Moment[]): Moment {
    if (currentMonthView) {
      return currentMonthView;
    } else if (selected && selected[0]) {
      return selected[0];
    } else {
      return moment();
    }
  }

  // todo:: add unit test
  getInputType(value: CalendarValue): ECalendarValue {
    if (Array.isArray(value) && value.length) {
      if (typeof value[0] === 'string') {
        return ECalendarValue.StringArr;
      } else if (moment.isMoment(value[0])) {
        return ECalendarValue.MomentArr;
      }
    } else {
      if (typeof value === 'string') {
        return ECalendarValue.String;
      } else if (moment.isMoment(value)) {
        return ECalendarValue.Moment;
      }
    }
  }

  // todo:: add unit test
  convertToMomentArray(value: CalendarValue, format: string): Moment[] {
    switch (this.getInputType(value)) {
      case (ECalendarValue.String):
        return [moment(value, format)];
      case (ECalendarValue.StringArr):
        return (<string[]>value).map(v => moment(v, format));
      case (ECalendarValue.Moment):
        return [<Moment>value];
      case (ECalendarValue.MomentArr):
        return <Moment[]>value;
      default:
        return [];
    }
  }

  // todo:: add unit test
  convertFromMomentArray(format: string,
                         value: moment.Moment[],
                         inputValueType: ECalendarValue): CalendarValue {
    switch (inputValueType) {
      case (ECalendarValue.String):
        return value[0].format(format);
      case (ECalendarValue.StringArr):
        return value.map(v => v.format(format));
      case (ECalendarValue.Moment):
        return value[0];
      case (ECalendarValue.MomentArr):
      default:
        return value;
    }
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

  updateSelected(config: IDayCalendarConfig, currentlySelected: Moment[], day: IDay): Moment[] {
    const isSelected = !day.selected;
    if (config.allowMultiSelect) {
      return isSelected
        ? currentlySelected.concat([day.date])
        : currentlySelected.filter(date => !date.isSame(day.date, 'day'));
    } else {
      return isSelected ? [day.date] : [];
    }
  }

  getHeaderLabel(config: IDayCalendarConfig, month: moment.Moment): string {
    if (config.monthFormatter) {
      return config.monthFormatter(month);
    }

    return month.format(config.monthFormat);
  }

  shouldShowLeft(min: Moment, currentMonthView: moment.Moment): boolean {
    return min ? min.isBefore(currentMonthView, 'month') : true;
  }

  shouldShowRight(max: Moment, currentMonthView: moment.Moment): boolean {
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
}
