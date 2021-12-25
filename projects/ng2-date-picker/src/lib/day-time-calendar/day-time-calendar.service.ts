import {Injectable} from '@angular/core';

import {UtilsService} from '../common/services/utils/utils.service';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {TimeSelectService} from '../time-select/time-select.service';
import {IDayTimeCalendarConfig} from './day-time-calendar-config.model';
import {dayjsRef} from '../common/dayjs/dayjs.ref';
import {Dayjs} from 'dayjs';

const DAY_FORMAT = 'YYYYMMDD';
const TIME_FORMAT = 'HH:mm:ss';
const COMBINED_FORMAT = DAY_FORMAT + TIME_FORMAT;

@Injectable({
    providedIn: 'root'
})
export class DayTimeCalendarService {
  readonly DEFAULT_CONFIG: IDayTimeCalendarConfig = {};

  constructor(private utilsService: UtilsService,
              private dayCalendarService: DayCalendarService,
              private timeSelectService: TimeSelectService) {
  }

  getConfig(config: IDayTimeCalendarConfig): IDayTimeCalendarConfig {
    return {
      ...this.DEFAULT_CONFIG,
      ...this.timeSelectService.getConfig(config),
      ...this.dayCalendarService.getConfig(config)
    };
  }

  updateDay(current: Dayjs, day: Dayjs, config: IDayTimeCalendarConfig): Dayjs {
    const time = current ? current : dayjsRef();
    let updated = dayjsRef(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);

    if (config.min) {
      const min = <Dayjs>config.min;
      updated = min.isAfter(updated) ? min : updated;
    }

    if (config.max) {
      const max = <Dayjs>config.max;
      updated = max.isBefore(updated) ? max : updated;
    }

    return updated;
  }

  updateTime(current: Dayjs, time: Dayjs): Dayjs {
    const day = current ? current : dayjsRef();

    return dayjsRef(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
  }
}
