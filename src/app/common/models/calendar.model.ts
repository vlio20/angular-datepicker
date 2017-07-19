import {locale, Moment} from 'moment';

export interface ICalendar {
  locale?: string;
  min?: Moment;
  max?: Moment;
}