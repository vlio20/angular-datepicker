import {Injectable} from '@angular/core';
import {IDayPickerConfig} from './day-picker-config.model';
import * as moment from 'moment';
import {UtilsService} from '../../common/services/utils/utils.service';
import {ICalendarConfig} from '../../ob-calendar/config/calendar-config.model';

@Injectable()
export class DayPickerService {
  private config: IDayPickerConfig = {
    selected: moment(),
    firstDayOfWeek: 'su',
    calendarsAmount: 1,
    weekdayNames: {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    }
  };

  setConfig(config: IDayPickerConfig) {
    this.config = Object.assign({}, this.config, config);
    return this.getConfig();
  }

  getConfig(): IDayPickerConfig {
    return Object.freeze(this.config);
  }

  generateCalendars(): ICalendarConfig[] {
    return UtilsService.createArray(this.config.calendarsAmount).map((n: number, i: number) => ({
      month: moment().add(i, 'month'),
      firstDayOfWeek: this.config.firstDayOfWeek,
      weekdayNames: this.config.weekdayNames
    }));
  }
}
