import {SingleCalendarValue} from './single-calendar-value';
import {unitOfTime} from 'moment';
import {SelectEvent} from './selection-event.enum';

export interface ISelectionEvent {
  date: SingleCalendarValue;
  granularity: unitOfTime.Base;
  type: SelectEvent;
}
