import {Injectable} from '@angular/core';

import {UtilsService} from '../common/services/utils/utils.service';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {TimeSelectService} from '../time-select/time-select.service';
import {IDayTimeCalendarConfig, IDayTimeCalendarConfigInternal} from './day-time-calendar-config.model';
import {dayjsRef} from '../common/dayjs/dayjs.ref';
import {Dayjs} from 'dayjs';
import {IDayCalendarConfigInternal} from '../day-calendar/day-calendar-config.model';

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

  getConfig(config: IDayTimeCalendarConfig): IDayTimeCalendarConfigInternal {
    const _config =  {
      ...this.DEFAULT_CONFIG,
      ...this.timeSelectService.getConfig(config),
      ...this.dayCalendarService.getConfig(config)
    };

    this.utilsService.convertPropsToDayjs(_config, _config.format, ['min', 'max']);

    return _config as IDayTimeCalendarConfigInternal;
  }

  updateDay(current: Dayjs, day: Dayjs, config: IDayCalendarConfigInternal): Dayjs {
    const time = current ? current : dayjsRef();
    let updated = dayjsRef(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);

    if (config.min) {
      const min = config.min;
      updated = min.isAfter(updated) ? min : updated;
    }

    if (config.max) {
      const max = config.max;
      updated = max.isBefore(updated) ? max : updated;
    }

    return updated;
  }

  updateTime(current: Dayjs, time: Dayjs): Dayjs {
    const day = current ? current : dayjsRef();

    return dayjsRef(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
  }
}
