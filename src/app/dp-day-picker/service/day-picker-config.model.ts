import {ICalendarConfig} from './../../dp-calendar/config/calendar-config.model';

export interface IDayPickerConfig extends ICalendarConfig {
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  disableKeypress?: boolean;
  userValueType?: 'string' | 'object';
  appendTo?: string;
}
