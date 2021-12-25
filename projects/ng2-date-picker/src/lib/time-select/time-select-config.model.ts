import {Dayjs} from 'dayjs';
import {ICalendar, ICalendarInternal} from '../common/models/calendar.model';
import {ECalendarValue} from '../common/types/calendar-value-enum';

interface IConfig {
  hours12Format?: string;
  hours24Format?: string;
  maxTime?: Dayjs;
  meridiemFormat?: string;
  minTime?: Dayjs;
  minutesFormat?: string;
  minutesInterval?: number;
  secondsFormat?: string;
  secondsInterval?: number;
  showSeconds?: boolean;
  showTwentyFourHours?: boolean;
  timeSeparator?: string;
  returnedValueType?: ECalendarValue;
}

export interface ITimeSelectConfig extends IConfig, ICalendar {
}

export interface ITimeSelectConfigInternal extends IConfig,
                                                   ICalendarInternal {
}
