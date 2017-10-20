import {TDrops, TOpens} from '../common/types/poistions.type';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';
import {IYearCalendarConfig} from '../year-calendar/year-calendar-config';
import {ITimeSelectConfig} from '../time-select/time-select-config.model';

export interface IDatePickerDirectiveConfig extends IDayCalendarConfig, IMonthCalendarConfig, IYearCalendarConfig, ITimeSelectConfig {
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  onOpenDelay?: number;
  disableKeypress?: boolean;
  appendTo?: string | HTMLElement;
  inputElementContainer?: HTMLElement;
  drops?: TDrops;
  opens?: TOpens;
  hideInputContainer?: boolean;
}
