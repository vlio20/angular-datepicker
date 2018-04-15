import {SingleCalendarValue} from './single-calendar-value';
import {unitOfTime} from 'moment';
import {SelectEvent} from './selection-evet.enum.';

export interface ISelectionEvent {
  date: SingleCalendarValue;
  granularity: unitOfTime.Base;
  type: SelectEvent;
}
