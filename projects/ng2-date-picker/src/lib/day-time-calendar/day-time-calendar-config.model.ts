import {ITimeSelectConfig, ITimeSelectConfigInternal} from '../time-select/time-select-config.model';
import {IDayCalendarConfig, IDayCalendarConfigInternal} from '../day-calendar/day-calendar-config.model';

export interface IDayTimeCalendarConfig extends ITimeSelectConfig, IDayCalendarConfig {
}

export interface IDayTimeCalendarConfigInternal extends ITimeSelectConfigInternal, IDayCalendarConfigInternal {
}
