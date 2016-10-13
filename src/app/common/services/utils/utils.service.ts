import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

@Injectable()
export class UtilsService {

  static createArray(size: number): number[] {
    return new Array(size).fill(1);
  }

  static convertToMoment(date: Moment | string, format: string): Moment | null {
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
