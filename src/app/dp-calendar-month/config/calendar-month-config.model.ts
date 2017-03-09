import {Moment} from 'moment';
import {WeekDays} from '../../common/types/week-days.type';

export interface ICalendarMonthConfig extends IBaseCalendarConfig {
  month: Moment;
  firstDayOfWeek: WeekDays;
  min?: Moment;
  max?: Moment;
}

export interface IBaseCalendarConfig {
  isDisabledCallback?: (date: Moment) => boolean;
  weekdayNames?: {[key: string]: string};
}
