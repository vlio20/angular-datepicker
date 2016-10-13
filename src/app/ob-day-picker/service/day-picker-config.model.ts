import {Moment} from 'moment';
import {WeekDays} from '../../common/types/week-days.type';

export interface IDayPickerConfig {
  firstDayOfWeek?: WeekDays;
  calendarsAmount?: number;
  format?: string;
  min?: Moment;
  max?: Moment;
  weekdayNames?: {[key: string]: string};
}