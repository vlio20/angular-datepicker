import {TDrops, TOpens} from '../common/types/poistions.type';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';

export interface IDatePickerDirectiveConfig extends IDayCalendarConfig, IMonthCalendarConfig {
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  onOpenDelay?: number;
  disableKeypress?: boolean;
  appendTo?: string|HTMLElement;
  inputElementContainer?: HTMLElement;
  drops?: TDrops;
  opens?: TOpens;
  hideInputContainer?: boolean;
}
