import {Dayjs} from 'dayjs';
import {ICalendar, ICalendarInternal} from '../common/models/calendar.model';
import {ECalendarValue} from '../common/types/calendar-value-enum';

export interface IConfig {
  isMonthDisabledCallback?: (date: Dayjs) => boolean;
  allowMultiSelect?: boolean;
  yearFormat?: string;
  yearFormatter?: (month: Dayjs) => string;
  format?: string;
  isNavHeaderBtnClickable?: boolean;
  monthBtnFormat?: string;
  monthBtnFormatter?: (day: Dayjs) => string;
  numOfMonthRows?: number;
  monthBtnCssClassCallback?: (day: Dayjs) => string;
  multipleYearsNavigateBy?: number;
  showMultipleYearsNavigation?: boolean;
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
