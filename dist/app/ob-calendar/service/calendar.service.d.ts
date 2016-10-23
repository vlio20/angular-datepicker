import { Moment } from 'moment';
import { WeekDays } from '../../common/types/week-days.type';
import { ICalendarDay } from '../config/day.model';
import { ICalendarConfig } from '../config/calendar-config.model';
export declare class CalendarService {
    readonly DAYS: string[];
    generateDaysIndexMap(firstDayOfWeek: WeekDays): {
        [key: number]: string;
    };
    generateDaysMap(firstDayOfWeek: WeekDays): {
        [key: number]: string;
    };
    generateMonthArray(firstDayOfWeek: WeekDays, dayInMonth: Moment, selectedDay: Moment): ICalendarDay[][];
    generateWeekdays(firstDayOfWeek: WeekDays, weekdayNames: {
        [key: string]: string;
    }): string[];
    isDateDisabled(day: ICalendarDay, config: ICalendarConfig): boolean;
}
