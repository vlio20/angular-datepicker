import {TDrops, TOpens} from '../common/types/poistions.type';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';
import {ITimeSelectConfig} from '../time-select/time-select-config.model';
import {ElementRef} from '@angular/core';

export interface IDatePickerDirectiveConfig extends Omit<IDayCalendarConfig, 'allowMultiSelect'>,
                                                    Omit<IMonthCalendarConfig, 'allowMultiSelect'>,
                                                    ITimeSelectConfig {
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  onOpenDelay?: number;
  disableKeypress?: boolean;
  inputElementContainer?: HTMLElement | ElementRef;
  drops?: TDrops;
  opens?: TOpens;
  hideInputContainer?: boolean;
}
