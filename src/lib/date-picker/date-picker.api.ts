import {SingleCalendarValue} from '../common/types/single-calendar-value';

export interface IDpDayPickerApi {
  open: () => void;
  close: () => void;
  moveCalendarTo: (date: SingleCalendarValue) => void;
}
