import { Moment } from 'moment';
export interface ICalendarDay {
    date: Moment;
    selected?: boolean;
    currentMonth?: boolean;
    prevMonth?: boolean;
    nextMonth?: boolean;
    currentDay?: boolean;
}
