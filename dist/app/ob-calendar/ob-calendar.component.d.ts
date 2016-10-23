import { OnInit, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CalendarService } from './service/calendar.service';
import { ICalendarConfig } from './config/calendar-config.model';
import { ICalendarDay } from './config/day.model';
import { Moment } from 'moment';
export declare class ObCalendarComponent implements OnInit, OnChanges {
    private calendarService;
    config: ICalendarConfig;
    selected: Moment;
    dateClicked: EventEmitter<{}>;
    weeks: ICalendarDay[][];
    weekdays: string[];
    constructor(calendarService: CalendarService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    isDisabledDay(day: ICalendarDay): boolean;
    dateClick(day: ICalendarDay): void;
}
