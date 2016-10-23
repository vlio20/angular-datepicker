import { IDayPickerConfig } from './day-picker-config.model';
import { ICalendarConfig } from '../../ob-calendar/config/calendar-config.model';
import { Moment } from 'moment';
import { FormControl } from '@angular/forms';
export declare class DayPickerService {
    private defaultConfig;
    getConfig(config: IDayPickerConfig): {} & IDayPickerConfig;
    generateCalendars(config: IDayPickerConfig, selected: Moment, month?: Moment): ICalendarConfig[];
    isDateValid(date: string, format: string): boolean;
    moveCalendars(config: IDayPickerConfig, selected: Moment, base: Moment, months: number): ICalendarConfig[];
    isMinMonth(min: Moment, month: any): boolean;
    isMaxMonth(max: Moment, month: any): boolean;
    createValidator({minDate, maxDate}: {
        minDate: any;
        maxDate: any;
    }, dateFormat: string): (c: FormControl) => any;
}
