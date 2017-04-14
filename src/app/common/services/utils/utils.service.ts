import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {CalendarValue, ECalendarValue} from '../../types/calendar-value';

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

  convertToMoment(date: Moment | string, format: string): Moment | null {
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
  getInputType(value: CalendarValue, allowMultiSelect: boolean): ECalendarValue {
    if (Array.isArray(value) && (<Moment[]|string[]>value).length) {
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

    return allowMultiSelect ? ECalendarValue.MomentArr : ECalendarValue.Moment;
  }

  // todo:: add unit test
  convertToMomentArray(value: CalendarValue, format: string, allowMultiSelect: boolean): Moment[] {
    switch (this.getInputType(value, allowMultiSelect)) {
      case (ECalendarValue.String):
        return [moment(value, format)];
      case (ECalendarValue.StringArr):
        return (<string[]>value).map(v => moment(v, format));
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
      default:
        return value;
    }
  }

  // todo:: add unit test
  clearUndefined<T>(obj: T): T {
    Object.keys(obj).forEach((key) => (obj[key] === undefined) && delete obj[key]);
    return obj;
  }
}
