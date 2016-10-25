import {Moment} from 'moment';
import {WeekDays} from '../../common/types/week-days.type';

export interface IDayPickerConfig {
  firstDayOfWeek?: WeekDays;
  calendarsAmount?: number;
  format?: string;
  min?: Moment | string;
  max?: Moment | string;
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  weekdayNames?: {[key: string]: string};
  disableKeypress?: boolean;
}