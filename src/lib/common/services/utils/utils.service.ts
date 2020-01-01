import {ECalendarValue} from '../../types/calendar-value-enum';
import {SingleCalendarValue} from '../../types/single-calendar-value';
import {Injectable} from '@angular/core';
import * as momentNs from 'moment';
import {Moment, unitOfTime} from 'moment';
import {CalendarValue} from '../../types/calendar-value';
import {IDate} from '../../models/date.model';
import {CalendarMode} from '../../types/calendar-mode';
import {DateValidator} from '../../types/validator.type';
import {ICalendarInternal} from '../../models/calendar.model';

const moment = momentNs;

export interface DateLimits {
  minDate?: SingleCalendarValue;
  maxDate?: SingleCalendarValue;
  minTime?: SingleCalendarValue;
  maxTime?: SingleCalendarValue;
}

@Injectable({
  providedIn: 'root'
})
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

  convertToMoment(date: SingleCalendarValue, format: string): Moment {
    if (!date) {
      return null;
    } else if (typeof date === 'string') {
      return moment(date, format);
    } else {
      return date.clone();
    }
  }

  isDateValid(date: string, format: string): boolean {
    if (date === '') {
      return true;
    }

    return moment(date, format, true).isValid();
  }

  // todo:: add unit test
  getDefaultDisplayDate(current: Moment,
                        selected: Moment[],
                        allowMultiSelect: boolean,
                        minDate: Moment): Moment {
    if (current) {
      return current.clone();
    } else if (minDate && minDate.isAfter(moment())) {
      return minDate.clone();
    } else if (allowMultiSelect) {
      if (selected && selected[selected.length]) {
        return selected[selected.length].clone();
      }
    } else if (selected && selected[0]) {
      return selected[0].clone();
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
  convertToMomentArray(value: CalendarValue,
                       config: {allowMultiSelect?: boolean, format?: string}): Moment[] {
    let retVal: Moment[];
    switch (this.getInputType(value, config.allowMultiSelect)) {
      case (ECalendarValue.String):
        retVal = value ? [moment(<string>value, config.format, true)] : [];
        break;
      case (ECalendarValue.StringArr):
        retVal = (<string[]>value).map(v => v ? moment(v, config.format, true) : null).filter(Boolean);
        break;
      case (ECalendarValue.Moment):
        retVal = value ? [(<Moment>value).clone()] : [];
        break;
      case (ECalendarValue.MomentArr):
        retVal = (<Moment[]>value || []).map(v => v.clone());
        break;
      default:
        retVal = [];
    }

    return retVal;
  }

  // todo:: add unit test
  convertFromMomentArray(format: string,
                         value: Moment[],
                         convertTo: ECalendarValue): CalendarValue {
    switch (convertTo) {
      case (ECalendarValue.String):
        return value[0] && value[0].format(format);
      case (ECalendarValue.StringArr):
        return value.filter(Boolean).map(v => v.format(format));
      case (ECalendarValue.Moment):
        return value[0] ? value[0].clone() : value[0];
      case (ECalendarValue.MomentArr):
        return value ? value.map(v => v.clone()) : value;
      default:
        return value;
    }
  }

  convertToString(value: CalendarValue, format: string): string {
    let tmpVal: string[];

    if (typeof value === 'string') {
      tmpVal = [value];
    } else if (Array.isArray(value)) {
      if (value.length) {
        tmpVal = (<SingleCalendarValue[]>value).map((v) => {
          return this.convertToMoment(v, format).format(format);
        });
      } else {
        tmpVal = <string[]>value;
      }
    } else if (moment.isMoment(value)) {
      tmpVal = [value.format(format)];
    } else {
      return '';
    }

    return tmpVal.filter(Boolean).join(' | ');
  }

  // todo:: add unit test
  clearUndefined<T>(obj: T): T {
    if (!obj) {
      return obj;
    }

    Object.keys(obj).forEach((key) => (obj[key] === undefined) && delete obj[key]);
    return obj;
  }

  updateSelected(isMultiple: boolean,
                 currentlySelected: Moment[],
                 date: IDate,
                 granularity: unitOfTime.Base = 'day'): Moment[] {
    if (isMultiple) {
      return !date.selected
        ? currentlySelected.concat([date.date])
        : currentlySelected.filter(d => !d.isSame(date.date, granularity));
    } else {
      return !date.selected ? [date.date] : [];
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
    return m && moment.isMoment(m) && moment(m.format('HH:mm:ss'), 'HH:mm:ss');
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

  createValidator({minDate, maxDate, minTime, maxTime}: DateLimits,
                  format: string,
                  calendarType: CalendarMode): DateValidator {
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

      value = this.convertToMomentArray(inputVal, {
        format,
        allowMultiSelect: true
      }).filter(Boolean);

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

  datesStringToStringArray(value: string): string[] {
    return (value || '').split('|').map(m => m.trim()).filter(Boolean);
  }

  getValidMomentArray(value: string, format: string): Moment[] {
    return this.datesStringToStringArray(value)
      .filter(d => this.isDateValid(d, format))
      .map(d => moment(d, format));
  }

  shouldShowCurrent(showGoToCurrent: boolean,
                    mode: CalendarMode,
                    min: Moment,
                    max: Moment): boolean {
    return showGoToCurrent &&
      mode !== 'time' &&
      this.isDateInRange(moment(), min, max);
  }

  isDateInRange(date: Moment, from: Moment, to: Moment): boolean {
    return date.isBetween(from, to, 'day', '[]');
  }

  convertPropsToMoment(obj: {[key: string]: any}, format: string, props: string[]) {
    props.forEach((prop) => {
      if (obj.hasOwnProperty(prop)) {
        obj[prop] = this.convertToMoment(obj[prop], format);
      }
    });
  }

  shouldResetCurrentView<T extends ICalendarInternal>(prevConf: T, currentConf: T): boolean {
    if (prevConf && currentConf) {
      if (!prevConf.min && currentConf.min) {
        return true;
      } else if (prevConf.min && currentConf.min && !prevConf.min.isSame(currentConf.min, 'd')) {
        return true;
      } else if (!prevConf.max && currentConf.max) {
        return true;
      } else if (prevConf.max && currentConf.max && !prevConf.max.isSame(currentConf.max, 'd')) {
        return true;
      }

      return false;
    }

    return false;
  }

  getNativeElement(elem: HTMLElement | string): HTMLElement {
    if (!elem) {
      return null;
    } else if (typeof elem === 'string') {
      return <HTMLElement>document.querySelector(elem);
    } else {
      return elem;
    }
  }
}
