import {ICalendarConfig} from './../../dp-calendar/config/calendar-config.model';
import {TDrops, TOpens} from '../../common/types/poistions.type';

export interface IDayPickerConfig extends ICalendarConfig {
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  onOpenDelay?: number;
  disableKeypress?: boolean;
  userValueType?: 'string' | 'object';
  appendTo?: string|HTMLElement;
  drops?: TDrops;
  opens?: TOpens;
}