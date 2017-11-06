import {locale, Moment} from 'moment';
import {ICalendar, ICalendarInternal} from '../common/models/calendar.model';
import {ECalendarValue} from '../common/types/calendar-value-enum';

export interface IConfig {
  isYearDisabledCallback?: (date: Moment) => boolean;
  allowMultiSelect?: boolean;
  yearFormat?: string;
  format?: string;
  isNavHeaderBtnClickable?: boolean;
  yearBtnFormat?: string;
  yearBtnFormatter?: (day: Moment) => string;
  yearBtnCssClassCallback?: (day: Moment) => string;
  multipleYearsNavigateBy?: number;
  showMultipleYearsNavigation?: boolean;
  returnedValueType?: ECalendarValue;
  showGoToCurrent?: boolean;
}

export interface IYearCalendarConfig extends IConfig,
                                              ICalendar {

}

export interface IYearCalendarConfigInternal extends IConfig,
                                                      ICalendarInternal {
}
