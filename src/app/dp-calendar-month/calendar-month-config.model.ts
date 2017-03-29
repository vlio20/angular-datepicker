import {Moment} from 'moment';
import {WeekDays} from '../common/types/week-days.type';

export interface IBaseCalendarConfig {
  isDisabledCallback?: (date: Moment) => boolean;
  weekdayNames?: {[key: string]: string};
  showNearMonthDays?: boolean;
  showWeekNumbers?: boolean;
}

export interface ICalendarMonthConfig extends IBaseCalendarConfig {
  month: Moment;
  firstDayOfWeek: WeekDays;
  min?: Moment;
  max?: Moment;
}