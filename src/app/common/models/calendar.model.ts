import {Moment} from 'moment';

export interface ICalendar {
  locale?: string;
  min?: SingleCalendarValue;
  max?: Moment | string;
}

export interface ICalendarInternal {
  locale?: string;
  min?: Moment;
  max?: Moment;
}
