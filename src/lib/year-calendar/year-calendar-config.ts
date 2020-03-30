import {Moment} from 'moment';
import {ICalendar, ICalendarInternal} from '../common/models/calendar.model';
import {ECalendarValue} from '..';

export interface IConfig {
  isYearDisabledCallback?: (date: Moment) => boolean;
  isNavHeaderBtnClickable?: boolean;
  allowMultiSelect?: boolean;
  yearFormat?: string;
  yearFormatter?: (month: Moment) => string;
  format?: string;
  numOfYearsPerPage: number;
  numOfYearRows?: number;
  yearBtnCssClassCallback?: (year: Moment) => string;
  yearBtnFormatter?: (year: Moment) => string;
  yearBtnFormat?: string;
  returnedValueType?: ECalendarValue;
  showGoToCurrent?: boolean;
  unSelectOnClick?: boolean;
}

export interface IYearCalendarConfig extends IConfig,
                                             ICalendar {
}

export interface IYearCalendarConfigInternal extends IConfig,
                                                     ICalendarInternal {
}
