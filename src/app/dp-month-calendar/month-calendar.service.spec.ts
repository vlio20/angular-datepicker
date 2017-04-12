import {TestBed, inject} from '@angular/core/testing';
import * as moment from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {MonthCalendarService} from './month-calendar.service';
import {IMonth} from './month.model';

describe('Service: MonthCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonthCalendarService, UtilsService]
    });
  });

  it('should check the generateYear method', inject([MonthCalendarService], (service: MonthCalendarService) => {
    const year = moment('14-01-1987', 'DD-MM-YYYY');
    const selected = moment('14-01-1987', 'DD-MM-YYYY');
    const genYear = service.generateYear(year, [selected]);

    const current = year.clone().startOf('year');
    genYear.forEach((row) => {
      row.forEach((month) => {
        expect(month.date.isSame(current, 'month')).toBe(true);
        if (month.date.format('MMM') === 'Jan') {
          expect(month.selected).toBe(true);
        } else {
          expect(month.selected).toBe(false);
        }
        expect(month.currentMonth).toBe(false);

        current.add(1, 'month');
      });
    });
  }));

  it('should check the isDateDisabled method', inject([MonthCalendarService], (service: MonthCalendarService) => {
    const month: IMonth = {
      date: moment('09-04-2017', 'DD-MM-YYYY'),
      selected: false,
      currentMonth: false
    };
    const config1: any = {
      min: month.date.clone().subtract(1, 'month'),
      max: month.date.clone().add(1, 'month')
    };

    expect(service.isDateDisabled(month, config1)).toBe(false);
    month.date.subtract(1, 'month');
    expect(service.isDateDisabled(month, config1)).toBe(false);
    month.date.subtract(1, 'month');
    expect(service.isDateDisabled(month, config1)).toBe(true);
    month.date.add(3, 'month');
    expect(service.isDateDisabled(month, config1)).toBe(false);
    month.date.add(1, 'month');
    expect(service.isDateDisabled(month, config1)).toBe(true);
  }));
});
