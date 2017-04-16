import {TDrops, TOpens} from '../common/types/poistions.type';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';

export interface IDatePickerConfig extends IDayCalendarConfig, IMonthCalendarConfig {
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  onOpenDelay?: number;
  disableKeypress?: boolean;
  appendTo?: string|HTMLElement;
  showGoToCurrent?: boolean;
  drops?: TDrops;
  opens?: TOpens;
}