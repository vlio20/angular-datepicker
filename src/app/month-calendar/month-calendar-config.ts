import {locale, Moment} from 'moment';
import {ICalendar} from '../common/models/calendar.model';

export interface IMonthCalendarConfig extends ICalendar {
  isMonthDisabledCallback?: (date: Moment) => boolean;
  allowMultiSelect?: boolean;
  yearFormat?: string;
  yearFormatter?: (month: Moment) => string;
  format?: string;
  isNavHeaderBtnClickable?: boolean;
  monthBtnFormat?: string;
  monthBtnFormatter?: (day: Moment) => string;
  multipleYearsNavigateBy?: number;
  showMultipleYearsNavigation?: boolean;
}
