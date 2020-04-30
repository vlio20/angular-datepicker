import {Moment} from 'moment';
import {ICalendar, ICalendarInternal} from '../common/models/calendar.model';
import {ECalendarValue} from '..';

export interface IConfig {
  isMonthDisabledCallback?: (date: Moment) => boolean;
  allowMultiSelect?: boolean;
  yearFormat?: string;
  yearFormatter?: (month: Moment) => string;
  format?: string;
  isNavHeaderBtnClickable?: boolean;
  monthBtnFormat?: string;
  monthBtnFormatter?: (day: Moment) => string;
  numOfMonthRows?: number;
  monthBtnCssClassCallback?: (day: Moment) => string;
  secondaryNavigationStepDayView?: number;
  showSecondaryNavigationDayView?: boolean;
  secondaryNavigationStepMonthView?: number;
  showSecondaryNavigationMonthView?: boolean;
  returnedValueType?: ECalendarValue;
  showGoToCurrent?: boolean;
  unSelectOnClick?: boolean;
}

export interface IMonthCalendarConfig extends IConfig,
                                              ICalendar {
}

export interface IMonthCalendarConfigInternal extends IConfig,
                                                      ICalendarInternal {
}
