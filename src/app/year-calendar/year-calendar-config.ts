import {locale, Moment} from 'moment';
import {ICalendar} from '../common/models/calendar.model';

export interface IYearCalendarConfig extends ICalendar {
  isYearDisabledCallback?: (date: Moment) => boolean;
  allowMultiSelect?: boolean;
  yearFormat?: string;
  yearFormatter?: (month: Moment) => string;
  format?: string;
  isNavHeaderBtnClickable?: boolean;
  yearBtnFormat?: string;
  yearBtnFormatter?: (day: Moment) => string;
  yearBtnCssClassCallback?: (day: Moment) => string;
  multipleYearsNavigateBy?: number;
  showMultipleYearsNavigation?: boolean;
}
