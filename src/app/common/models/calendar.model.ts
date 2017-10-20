import {Moment} from 'moment';

export interface ICalendar {
  locale?: string;
  min?: Moment | string;
  max?: Moment | string;
}

export interface ICalendarInternal {
  locale?: string;
  min?: Moment;
  max?: Moment;
}
