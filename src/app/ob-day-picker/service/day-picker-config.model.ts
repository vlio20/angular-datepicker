import {Moment} from 'moment';
import {WeekDays} from '../../common/types/week-days.type';

export interface IDayPickerConfig {
  selected?: Moment;
  firstDayOfWeek?: WeekDays;
  calendarsAmount?: number;
  min?: Moment;
  max?: Moment;
  weekdayNames?: {[key: string]: string};
}