import {ICalendar, ICalendarInternal} from '../common/models/calendar.model';
import {WeekDays} from '../common/types/week-days.type';
import {Dayjs} from 'dayjs';
import {ECalendarValue} from '../common/types/calendar-value-enum';

interface IConfig {
  isDayDisabledCallback?: (date: Dayjs) => boolean;
  isMonthDisabledCallback?: (date: Dayjs) => boolean;
  weekDayFormat?: string;
  weekDayFormatter?: (dayIndex: number) => string;
  showNearMonthDays?: boolean;
  showWeekNumbers?: boolean;
  firstDayOfWeek?: WeekDays;
  format?: string;
  allowMultiSelect?: boolean;
  monthFormat?: string;
  monthFormatter?: (month: Dayjs) => string;
  enableMonthSelector?: boolean;
  yearFormat?: string;
  yearFormatter?: (year: Dayjs) => string;
  dayBtnFormat?: string;
  dayBtnFormatter?: (day: Dayjs) => string;
  dayBtnCssClassCallback?: (day: Dayjs) => string;
  monthBtnFormat?: string;
  monthBtnFormatter?: (day: Dayjs) => string;
  monthBtnCssClassCallback?: (day: Dayjs) => string;
  multipleYearsNavigateBy?: number;
  showMultipleYearsNavigation?: boolean;
  returnedValueType?: ECalendarValue;
  showGoToCurrent?: boolean;
  unSelectOnClick?: boolean;
  numOfMonthRows?: number;
}

export interface IDayCalendarConfig extends IConfig,
                                            ICalendar {
}

export interface IDayCalendarConfigInternal extends IConfig,
                                                    ICalendarInternal {
}
