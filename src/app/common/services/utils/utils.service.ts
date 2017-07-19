import {ECalendarValue} from '../../types/calendar-value-enum';
import {SingleCalendarValue} from '../../types/single-calendar-value';
import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment, unitOfTime} from 'moment';
import {CalendarValue} from '../../types/calendar-value';
import {IDate} from '../../models/date.model';
import {CalendarMode} from '../../types/calendar-mode';

export type DateValidatorFn = (inputVal: CalendarValue) => { [key: string]: any };
export interface DateLimits {
  minDate?: SingleCalendarValue;
  maxDate?: SingleCalendarValue;
  minTime?: SingleCalendarValue;
  maxTime?: SingleCalendarValue;
}

@Injectable()
export class UtilsService {
  static debounce(func: Function, wait: number) {
    let timeout;
    return function () {
      const context = this, args = arguments;
      timeout = clearTimeout(timeout);
      setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  };

  createArray(size: number): number[] {
    return new Array(size).fill(1);
  }

  convertToMoment(date: SingleCalendarValue, format: string): Moment | null {
    let retVal: Moment;
    if (!date) {
      return null;
    } else if (typeof date === 'string') {
      retVal = moment(date, format);
    } else {
      retVal = date;
    }

    return retVal;
  }

  isDateValid(date: string, format: string): boolean {
    if (date === '') {
      return true;
    }

    return moment(date, format, true).isValid();
  }

  // todo:: add unit test
  getDefaultDisplayDate(def: Moment, selected: Moment[], allowMultiSelect: boolean): Moment {
    if (def) {
      return def;
    } else if (allowMultiSelect) {
      if (selected && selected[selected.length]) {
        return selected[selected.length];
      }
    } else if (selected && selected[0]) {
      return selected[0];
    }

    return moment();
  }

  // todo:: add unit test
  getInputType(value: CalendarValue, allowMultiSelect: boolean): ECalendarValue {
    if (Array.isArray(value)) {
      if (!value.length) {
        return ECalendarValue.MomentArr;
      } else if (typeof value[0] === 'string') {
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

    return allowMultiSelect ? ECalendarValue.MomentArr : ECalendarValue.Moment;
  }

  // todo:: add unit test
  convertToMomentArray(value: CalendarValue, format: string, allowMultiSelect: boolean): Moment[] {
    switch (this.getInputType(value, allowMultiSelect)) {
      case (ECalendarValue.String):
        return value ? [moment(value, format)] : [];
      case (ECalendarValue.StringArr):
        return (<string[]>value).map(v => v ? moment(v, format) : null).filter(Boolean);
      case (ECalendarValue.Moment):
        return [<Moment>value];
      case (ECalendarValue.MomentArr):
        return <Moment[]>[].concat(value);
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
        return value;
      default:
        return value;
    }
  }

  // todo:: add unit test
  clearUndefined<T>(obj: T): T {
    if (!obj) {
      return obj;
    }

    Object.keys(obj).forEach((key) => (obj[key] === undefined) && delete obj[key]);
    return obj;
  }

  // todo:: add unit test
  compareMomentArrays(arr1: Moment[], arr2: Moment[], granularity: unitOfTime.Base): boolean {
    if (arr1.length !== arr2.length) {
      return false;
    }

    const sortArr1 = arr1.sort((a, b) => a.diff(b));
    const sortArr2 = arr1.sort((a, b) => a.diff(b));

    for (let i = 0; i < sortArr1.length; i++) {
      if (!sortArr1[i].isSame(sortArr2, granularity)) {
        return false;
      }
    }

    return true;
  }

  updateSelected(isMultiple: boolean,
                 currentlySelected: Moment[],
                 date: IDate,
                 granularity: unitOfTime.Base = 'day'): Moment[] {
    const isSelected = !date.selected;
    if (isMultiple) {
      return isSelected
        ? currentlySelected.concat([date.date])
        : currentlySelected.filter(d => !d.isSame(date.date, granularity));
    } else {
      return isSelected ? [date.date] : [];
    }
  }

  closestParent(element: HTMLElement, selector: string): HTMLElement {
    if (!element) {
      return undefined;
    }
    const match = <HTMLElement>element.querySelector(selector);
    return match || this.closestParent(element.parentElement, selector);
  }

  onlyTime(m: Moment): Moment {
    return m && moment(m.format('HH:mm:ss'), 'HH:mm:ss');
  }

  granularityFromType(calendarType: CalendarMode): unitOfTime.Base {
    switch (calendarType) {
      case 'time':
        return 'second';
      case 'daytime':
        return 'second';
      default:
        return calendarType;
    }
  }

  createValidator({minDate, maxDate, minTime, maxTime}: DateLimits, format: string, calendarType: CalendarMode): DateValidatorFn {
    let isValid: boolean;
    let value: Moment[];
    const validators = [];
    const granularity = this.granularityFromType(calendarType);

    if (minDate) {
      const md = this.convertToMoment(minDate, format);
      validators.push({
        key: 'minDate',
        isValid: () => {
          const _isValid = value.every(val => val.isSameOrAfter(md, granularity));
          isValid = isValid ? _isValid : false;
          return _isValid;
        }
      });
    }

    if (maxDate) {
      const md = this.convertToMoment(maxDate, format);
      validators.push({
        key: 'maxDate',
        isValid: () => {
          const _isValid = value.every(val => val.isSameOrBefore(md, granularity));
          isValid = isValid ? _isValid : false;
          return _isValid;
        }
      });
    }

    if (minTime) {
      const md = this.onlyTime(this.convertToMoment(minTime, format));
      validators.push({
        key: 'minTime',
        isValid: () => {
          const _isValid = value.every(val => this.onlyTime(val).isSameOrAfter(md));
          isValid = isValid ? _isValid : false;
          return _isValid;
        }
      });
    }

    if (maxTime) {
      const md = this.onlyTime(this.convertToMoment(maxTime, format));
      validators.push({
        key: 'maxTime',
        isValid: () => {
          const _isValid = value.every(val => this.onlyTime(val).isSameOrBefore(md));
          isValid = isValid ? _isValid : false;
          return _isValid;
        }
      });
    }

    return (inputVal: CalendarValue) => {
      isValid = true;

      value = this.convertToMomentArray(inputVal, format, true).filter(Boolean);

      if (!value.every(val => val.isValid())) {
        return {
          format: {
            given: inputVal
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
}
