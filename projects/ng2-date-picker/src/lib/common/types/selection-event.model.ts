import {SingleCalendarValue} from './single-calendar-value';
import {UnitType} from 'dayjs';
import {SelectEvent} from './selection-event.enum';

export interface ISelectionEvent {
  date: SingleCalendarValue;
  granularity: UnitType;
  type: SelectEvent;
}
