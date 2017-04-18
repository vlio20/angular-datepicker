import {Moment} from 'moment';

export interface IDay {
  date: Moment;
  selected?: boolean;
  currentMonth?: boolean;
  prevMonth?: boolean;
  nextMonth?: boolean;
  currentDay?: boolean;
}

export interface IDayEvent {
  day: IDay;
  event: MouseEvent;
}
