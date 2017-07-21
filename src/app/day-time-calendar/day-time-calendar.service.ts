import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';

import {UtilsService} from '../common/services/utils/utils.service';
import {DayCalendarService} from '../day-calendar/day-calendar.service';
import {TimeSelectService} from '../time-select/time-select.service';
import {IDayTimeCalendarConfig} from './day-time-calendar-config.model';

const DAY_FORMAT = 'YYYYMMDD';
const TIME_FORMAT = 'HH:mm:ss';
const COMBINED_FORMAT = DAY_FORMAT + TIME_FORMAT;

@Injectable()
export class DayTimeCalendarService {
  readonly DEFAULT_CONFIG: IDayTimeCalendarConfig = {
    locale: 'en'
  };

  constructor(private utilsService: UtilsService,
              private dayCalendarService: DayCalendarService,
              private timeSelectService: TimeSelectService) {
  }

  getConfig(config: IDayTimeCalendarConfig): IDayTimeCalendarConfig {
    const _config = {
      ...this.DEFAULT_CONFIG,
      ...this.timeSelectService.getConfig(config),
      ...this.dayCalendarService.getConfig(config)
    };

    moment.locale(config.locale);

    return _config;
  }

  updateDay(current: Moment, day: Moment): Moment {
    const time = current ? current : moment();
    return moment(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
  }

  updateTime(current: Moment, time: Moment): Moment {
    const day = current ? current : moment();
    return moment(day.format(DAY_FORMAT) + time.format(TIME_FORMAT), COMBINED_FORMAT);
  }
}
