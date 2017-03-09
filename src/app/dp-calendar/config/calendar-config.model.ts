import {IBaseCalendarConfig} from './../../dp-calendar-month/config/calendar-month-config.model';
import {Moment} from 'moment';
import {WeekDays} from '../../common/types/week-days.type';

export interface ICalendarConfig extends IBaseCalendarConfig {
  firstDayOfWeek?: WeekDays;
  calendarsAmount?: number;
  min?: Moment | string;
  max?: Moment | string;
  allowMultiSelect?: boolean;
  format?: string;
  monthFormat?: string;
  monthFormatter?: (date: Moment) => string;
}
