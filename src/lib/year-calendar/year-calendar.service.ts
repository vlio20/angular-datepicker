import {Injectable} from '@angular/core';
import * as momentNs from 'moment';
import {Moment} from 'moment';
import {IDateCell, UtilsService} from '../common/services/utils/utils.service';
import {IYearCalendarConfig, IYearCalendarConfigInternal} from './year-calendar-config';

const moment = momentNs;

@Injectable({
  providedIn: 'root'
})
export class YearCalendarService {
  readonly DEFAULT_CONFIG: IYearCalendarConfigInternal = {
    allowMultiSelect: false,
    yearFormat: 'YYYY',
    yearBtnFormat: 'YYYY',
    format: 'YYYY',
    numOfYearsPerPage: 24,
    numOfYearRows: 6,
    locale: moment.locale(),
    unSelectOnClick: true
  };

  constructor(private utilsService: UtilsService) {
  }

  getConfig(config: IYearCalendarConfig): IYearCalendarConfigInternal {
    const _config = <IYearCalendarConfigInternal>{
      ...this.DEFAULT_CONFIG,
      ...this.utilsService.clearUndefined(config)
    };

    this.validateConfig(_config);

    this.utilsService.convertPropsToMoment(_config, _config.format, ['min', 'max']);
    moment.locale(_config.locale);

    return _config;
  }

  generateCalendar(config: IYearCalendarConfig, year: Moment, selected: Moment[] = null): IDateCell[][] {
    return this.utilsService.generateCalendar<IYearCalendarConfig>({
      numOfRows: config.numOfYearRows,
      numOfCells: config.numOfYearsPerPage,
      isDisabledCb: this.isYearDisabled,
      getBtnTextCb: this.getYearBtnText,
      selected,
      config,
      startDate: year.clone().startOf('year'),
      granularity: 'year'
    });
  }

  isYearDisabled(date: Moment, config: IYearCalendarConfig) {
    if (config.min && date.isBefore(config.min, 'year')) {
      return true;
    }

    return !!(config.max && date.isAfter(config.max, 'year'));
  }

  shouldShowLeft(min: Moment, currentMonthView: Moment): boolean {
    return min ? min.isBefore(currentMonthView, 'year') : true;
  }

  shouldShowRight(max: Moment, currentMonthView: Moment): boolean {
    return max ? max.isAfter(currentMonthView, 'year') : true;
  }

  getHeaderLabel(config: IYearCalendarConfig, year: Moment): string {
    if (config.yearFormatter) {
      return config.yearFormatter(year);
    }

    return year.format(config.yearFormat);
  }

  getYearBtnText(config: IYearCalendarConfig, year: Moment): string {
    if (config.yearBtnFormatter) {
      return config.yearBtnFormatter(year);
    }

    return year.format(config.yearBtnFormat);
  }

  getYearBtnCssClass(config: IYearCalendarConfig, month: Moment): string {
    if (config.yearBtnCssClassCallback) {
      return config.yearBtnCssClassCallback(month);
    }

    return '';
  }

  private validateConfig(config: IYearCalendarConfigInternal): void {
  }
}
