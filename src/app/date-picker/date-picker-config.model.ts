import {TDrops, TOpens} from '../common/types/poistions.type';
import {IDayCalendarConfig, IDayCalendarConfigInternal} from '../day-calendar/day-calendar-config.model';
import {IMonthCalendarConfig, IMonthCalendarConfigInternal} from '../month-calendar/month-calendar-config';
import {ITimeSelectConfig, ITimeSelectConfigInternal} from '../time-select/time-select-config.model';

interface Config {
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  openOnFocus?: boolean;
  openOnClick?: boolean;
  onOpenDelay?: number;
  disableKeypress?: boolean;
  appendTo?: string | HTMLElement;
  inputElementContainer?: HTMLElement;
  drops?: TDrops;
  opens?: TOpens;
  hideInputContainer?: boolean;
}

export interface IDatePickerConfig extends Config,
                                           IDayCalendarConfig,
                                           IMonthCalendarConfig,
                                           ITimeSelectConfig {

}

export interface IDatePickerConfigInternal extends Config,
                                                   IDayCalendarConfigInternal,
                                                   IMonthCalendarConfigInternal,
                                                   ITimeSelectConfigInternal {
}
