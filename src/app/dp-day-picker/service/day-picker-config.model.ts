import {Moment} from 'moment';
import {WeekDays} from '../../common/types/week-days.type';

export interface IDayPickerConfig {
  firstDayOfWeek?: WeekDays;
  calendarsAmount?: number;
  format?: string;
  min?: Moment | string;
  max?: Moment | string;
  allowMultiSelect?: boolean;
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  weekdayNames?: {[key: string]: string};
  disableKeypress?: boolean;
  isDisabledCallback?: (day: Moment) => boolean;
  monthFormat?: string;
  monthFormatter?: (date: Moment) => string;
  userValueType?: 'string' | 'object';
}
