import {Moment} from 'moment';
import {ICalendar} from '../common/models/calendar.model';

export interface IMonthCalendarConfig extends ICalendar {
  isDisabledCallback?: (date: Moment) => boolean;
  allowMultiSelect?: boolean;
  yearFormat?: string;
  yearFormatter?: (month: Moment) => string;
  format?: string;
  isNavHeaderBtnClickable?: boolean;
}