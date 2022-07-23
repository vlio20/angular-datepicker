import {ECalendarValue} from '../../types/calendar-value-enum';
import {SingleCalendarValue} from '../../types/single-calendar-value';
import {ElementRef, Injectable} from '@angular/core';

import {Dayjs, UnitType} from 'dayjs';
import {CalendarValue} from '../../types/calendar-value';
import {IDate} from '../../models/date.model';
import {CalendarMode} from '../../types/calendar-mode';
import {DateValidator} from '../../types/validator.type';
import {ICalendarInternal} from '../../models/calendar.model';
import {dayjsRef} from '../../dayjs/dayjs.ref';

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

  convertToDayjs(date: SingleCalendarValue, format: string): Dayjs {
    if (!date) {
      return null;
    } else if (typeof date === 'string') {
      return dayjsRef(date, format);
    } else {
      return dayjsRef(date.toDate());
    }
  }

  isDateValid(date: string, format: string): boolean {
    if (date === '') {
      return true;
    }

    return dayjsRef(date, format, true).isValid();
  }

  // todo:: add unit test
  getDefaultDisplayDate(current: Dayjs,
                        selected: Dayjs[],
                        allowMultiSelect: boolean,
                        minDate: Dayjs): Dayjs {
    if (current) {
      return dayjsRef(current.toDate());
    } else if (minDate && minDate.isAfter(dayjsRef())) {
      return dayjsRef(minDate.toDate());
    } else if (allowMultiSelect) {
      if (selected && selected[selected.length]) {
        return dayjsRef(selected[selected.length].toDate());
      }
    } else if (selected && selected[0]) {
      return dayjsRef(selected[0].toDate());
    }

    return dayjsRef();
  }

  // todo:: add unit test
  getInputType(value: CalendarValue, allowMultiSelect: boolean): ECalendarValue {
    if (Array.isArray(value)) {
      if (!value.length) {
        return ECalendarValue.DayjsArr;
      } else if (typeof value[0] === 'string') {
        return ECalendarValue.StringArr;
      } else if (dayjsRef.isDayjs(value[0])) {
        return ECalendarValue.DayjsArr;
      }
    } else {
      if (typeof value === 'string') {
        return ECalendarValue.String;
      } else if (dayjsRef.isDayjs(value)) {
        return ECalendarValue.Dayjs;
      }
    }

    return allowMultiSelect ? ECalendarValue.DayjsArr : ECalendarValue.Dayjs;
  }

  // todo:: add unit test
  convertToDayjsArray(value: CalendarValue,
                      config: { allowMultiSelect?: boolean, format?: string }): Dayjs[] {
    let retVal: Dayjs[];
    switch (this.getInputType(value, config.allowMultiSelect)) {
      case (ECalendarValue.String):
        retVal = value ? [dayjsRef(<string>value, config.format, true)] : [];
        break;
      case (ECalendarValue.StringArr):
        retVal = (<string[]>value).map(v => v ? dayjsRef(v, config.format, true) : null).filter(Boolean);
        break;
      case (ECalendarValue.Dayjs):
        retVal = value ? [dayjsRef((<Dayjs>value).toDate())] : [];
        break;
      case (ECalendarValue.DayjsArr):
        retVal = (<Dayjs[]>value || []).map(v => dayjsRef(v.toDate()));
        break;
      default:
        retVal = [];
    }

    return retVal;
  }

  // todo:: add unit test
  convertFromDayjsArray(format: string,
                        value: Dayjs[],
                        convertTo: ECalendarValue): CalendarValue {
    switch (convertTo) {
      case (ECalendarValue.String):
        return value[0] && value[0].format(format);
      case (ECalendarValue.StringArr):
        return value.filter(Boolean).map(v => v.format(format));
      case (ECalendarValue.Dayjs):
        return value[0] ? dayjsRef(value[0].toDate()) : value[0];
      case (ECalendarValue.DayjsArr):
        return value ? value.map(v => dayjsRef(v.toDate())) : value;
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
          return this.convertToDayjs(v, format).format(format);
        });
      } else {
        tmpVal = <string[]>value;
      }
    } else if (dayjsRef.isDayjs(value)) {
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
                 currentlySelected: Dayjs[],
                 date: IDate,
                 granularity: UnitType = 'day'): Dayjs[] {
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

  onlyTime(m: Dayjs): Dayjs {
    return m && dayjsRef.isDayjs(m) && dayjsRef(m.format('HH:mm:ss'), 'HH:mm:ss');
  }

  granularityFromType(calendarType: CalendarMode): UnitType {
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
    let value: Dayjs[];
    const validators = [];
    const granularity = this.granularityFromType(calendarType);

    if (minDate) {
      const md = this.convertToDayjs(minDate, format);
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
      const md = this.convertToDayjs(maxDate, format);
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
      const md = this.onlyTime(this.convertToDayjs(minTime, format));
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
      const md = this.onlyTime(this.convertToDayjs(maxTime, format));
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

      value = this.convertToDayjsArray(inputVal, {
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

  getValidDayjsArray(value: string, format: string): Dayjs[] {
    return this.datesStringToStringArray(value)
      .filter(d => this.isDateValid(d, format))
      .map(d => dayjsRef(d, format));
  }

  shouldShowCurrent(showGoToCurrent: boolean,
                    mode: CalendarMode,
                    min: Dayjs,
                    max: Dayjs): boolean {
    return showGoToCurrent &&
      mode !== 'time' &&
      this.isDateInRange(dayjsRef(), min, max);
  }

  isDateInRange(date: Dayjs, from: Dayjs, to: Dayjs): boolean {
    if (!date) {
      return false;
    }

    if (!from && !to) {
      return true;
    }

    if (!from && to) {
      return date.isSameOrBefore(to);
    }

    if (from && !to) {
      return date.isSameOrAfter(from);
    }

    return date.isBetween(from, to, 'day', '[]');
  }

  convertPropsToDayjs(obj: { [key: string]: any }, format: string, props: string[]): void {
    props.forEach((prop) => {
      if (obj.hasOwnProperty(prop)) {
        obj[prop] = this.convertToDayjs(obj[prop], format);
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

  getNativeElement(elem: HTMLElement | string | ElementRef): HTMLElement {
    if (!elem) {
      return null;
    } else if (typeof elem === 'string') {
      return document.querySelector(elem);
    } else if (elem instanceof ElementRef) {
      return elem.nativeElement;
    } else {
      return elem;
    }
  }
}
