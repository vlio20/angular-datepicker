import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

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
}
