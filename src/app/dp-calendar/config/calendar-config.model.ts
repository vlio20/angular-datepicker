import {Moment} from 'moment';
import {WeekDays} from '../../common/types/week-days.type';

export interface ICalendarConfig {
  month: Moment;
  selected: Moment[];
  firstDayOfWeek: WeekDays;
  min?: Moment;
  max?: Moment;
  isDisabledCallback?: (date: Moment) => boolean;
  weekdayNames?: {[key: string]: string};
}
