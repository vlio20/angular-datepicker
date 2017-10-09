import {CalendarValue} from './calendar-value';

export type DateValidator = (inputVal: CalendarValue) => {[key: string]: any};
