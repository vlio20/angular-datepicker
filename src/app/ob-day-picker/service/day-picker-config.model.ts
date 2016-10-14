import {Moment} from 'moment';
import {WeekDays} from '../../common/types/week-days.type';

export interface IDayPickerConfig {
  firstDayOfWeek?: WeekDays;
  calendarsAmount?: number;
  format?: string;
  min?: Moment;
  max?: Moment;
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  weekdayNames?: {[key: string]: string};
  placeholder?: string;
  disabled?: boolean;
  disableKeypress?: boolean;
}