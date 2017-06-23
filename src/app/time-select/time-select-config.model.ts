import {ICalendar} from '../common/models/calendar.model';

export interface ITimeSelectConfig extends ICalendar {
  hours12Format?: string;
  hours24Format?: string;
  meridiemFormat?: string;
  minutesFormat?: string;
  minutesInterval?: number;
  secondsFormat?: string;
  secondsInterval?: number;
  showSeconds?: boolean;
  showTwentyFourHours?: boolean;
  timeSeparator?: string;
}
