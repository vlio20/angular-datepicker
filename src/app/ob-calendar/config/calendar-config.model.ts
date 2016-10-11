import {Moment} from 'moment';
import {WeekDays} from '../../common/types/week-days.type';

export interface ICalendarConfig {
  month: Moment;
  firstDayOfWeek: WeekDays;
  weekdayNames?: {[key: string]: string};
}