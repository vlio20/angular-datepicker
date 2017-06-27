import {Moment} from 'moment/moment';
import {ICalendar} from '../common/models/calendar.model';
import {ITimeSelectConfig} from '../time-select/time-select-config.model';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';

export interface IDayTimeCalendarConfig extends ITimeSelectConfig, IDayCalendarConfig {
}
