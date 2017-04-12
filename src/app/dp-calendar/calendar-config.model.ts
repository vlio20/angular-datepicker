import {Moment} from 'moment';

export interface ICalendarConfig {
  firstDayOfWeek?: string;
  calendarsAmount?: number;
  min?: Moment | string;
  max?: Moment | string;
  allowMultiSelect?: boolean;
  format?: string;
  monthFormat?: string;
  monthFormatter?: (date: Moment) => string;
  yearFormat?: string;
  yearFormatter?: (date: Moment) => string;
  enableMonthSelector?: boolean;
  showWeekNumbers?: boolean;
  weekdayNames?: {[key: string]: string};
  showNearMonthDays?: boolean;
  month?: Moment;

}
