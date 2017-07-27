import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {IMonth} from './month.model';
import {IMonthCalendarConfig} from './month-calendar-config';

@Injectable()
export class MonthCalendarService {
  readonly DEFAULT_CONFIG: IMonthCalendarConfig = {
    allowMultiSelect: false,
    yearFormat: 'YYYY',
    format: 'MM-YYYY',
    isNavHeaderBtnClickable: false,
    monthBtnFormat: 'MMM',
    locale: 'en',
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false
  };

  constructor(private utilsService: UtilsService) {
  }

  getConfig(config: IMonthCalendarConfig): IMonthCalendarConfig {
    const _config = {
      ...this.DEFAULT_CONFIG,
      ...this.utilsService.clearUndefined(config)
    };

    moment.locale(_config.locale);

    return _config;
  }

  generateYear(year: Moment, selected: Moment[] = null): IMonth[][] {
    const index = year.clone().startOf('year');

    return this.utilsService.createArray(3).map(() => {
      return this.utilsService.createArray(4).map(() => {
        const month = {
          date: index.clone(),
          selected: !!selected.find(s => index.isSame(s, 'month')),
          currentMonth: index.isSame(moment(), 'month')
        };

        index.add(1, 'month');
        return month;
      });
    });
  }

  isMonthDisabled(month: IMonth, config: IMonthCalendarConfig) {
    if (config.min && month.date.isBefore(config.min, 'month')) {
      return true;
    }

    return !!(config.max && month.date.isAfter(config.max, 'month'));
  }

  shouldShowLeft(min: Moment, currentMonthView: Moment): boolean {
    return min ? min.isBefore(currentMonthView, 'year') : true;
  }

  shouldShowRight(max: Moment, currentMonthView: Moment): boolean {
    return max ? max.isAfter(currentMonthView, 'year') : true;
  }

  getHeaderLabel(config: IMonthCalendarConfig, year: Moment): string {
    if (config.yearFormatter) {
      return config.yearFormatter(year);
    }

    return year.format(config.yearFormat);
  }

  getMonthBtnText(config: IMonthCalendarConfig, month: Moment) {
    if (config.monthBtnFormatter) {
      return config.monthBtnFormatter(month);
    }

    return month.format(config.monthBtnFormat);
  }
}
