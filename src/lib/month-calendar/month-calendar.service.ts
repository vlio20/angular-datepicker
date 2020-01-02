import {Injectable} from '@angular/core';
import * as momentNs from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {IMonth} from './month.model';
import {IMonthCalendarConfig, IMonthCalendarConfigInternal} from './month-calendar-config';

const moment = momentNs;

@Injectable()
export class MonthCalendarService {
  readonly DEFAULT_CONFIG: IMonthCalendarConfigInternal = {
    allowMultiSelect: false,
    yearFormat: 'YYYY',
    format: 'MM-YYYY',
    isNavHeaderBtnClickable: false,
    monthBtnFormat: 'MMM',
    locale: moment.locale(),
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false,
    unSelectOnClick: true,
    numOfMonthRows: 3
  };

  constructor(private utilsService: UtilsService) {
  }

  getConfig(config: IMonthCalendarConfig): IMonthCalendarConfigInternal {
    const _config = <IMonthCalendarConfigInternal>{
      ...this.DEFAULT_CONFIG,
      ...this.utilsService.clearUndefined(config)
    };

    this.validateConfig(_config);

    this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
    moment.locale(_config.locale);

    return _config;
  }

  generateYear(config: IMonthCalendarConfig, year: Moment, selected: Moment[] = null): IMonth[][] {
    const index = year.clone().startOf('year');

    return this.utilsService.createArray(config.numOfMonthRows).map(() => {
      return this.utilsService.createArray(12 / config.numOfMonthRows).map(() => {
        const date = index.clone();
        const month = {
          date,
          selected: !!selected.find(s => index.isSame(s, 'month')),
          currentMonth: index.isSame(moment(), 'month'),
          disabled: this.isMonthDisabled(date, config),
          text: this.getMonthBtnText(config, date)
        };

        index.add(1, 'month');

        return month;
      });
    });
  }

  isMonthDisabled(date: Moment, config: IMonthCalendarConfig) {
    if (config.min && date.isBefore(config.min, 'month')) {
      return true;
    }

    return !!(config.max && date.isAfter(config.max, 'month'));
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

  getMonthBtnText(config: IMonthCalendarConfig, month: Moment): string {
    if (config.monthBtnFormatter) {
      return config.monthBtnFormatter(month);
    }

    return month.format(config.monthBtnFormat);
  }

  getMonthBtnCssClass(config: IMonthCalendarConfig, month: Moment): string {
    if (config.monthBtnCssClassCallback) {
      return config.monthBtnCssClassCallback(month);
    }

    return '';
  }

  private validateConfig(config: IMonthCalendarConfigInternal): void {
    if (config.numOfMonthRows < 1 || config.numOfMonthRows > 12 || !Number.isInteger(12 / config.numOfMonthRows)) {
      throw new Error('numOfMonthRows has to be between 1 - 12 and divide 12 to integer');
    }
  }
}
