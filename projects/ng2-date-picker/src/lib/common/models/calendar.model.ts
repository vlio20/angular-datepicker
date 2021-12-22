import {Dayjs} from 'dayjs';
import {SingleCalendarValue} from '../types/single-calendar-value';

export interface ICalendar {
  locale?: string;
  min?: SingleCalendarValue;
  max?: Dayjs | string;
}

export interface ICalendarInternal {
  locale?: string;
  min?: Dayjs;
  max?: Dayjs;
}
