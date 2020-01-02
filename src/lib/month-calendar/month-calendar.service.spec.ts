import {inject, TestBed} from '@angular/core/testing';
import * as momentNs from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {MonthCalendarService} from './month-calendar.service';
import {IMonth} from './month.model';

const moment = momentNs;

describe('Service: MonthCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonthCalendarService, UtilsService]
    });
  });

  it('should check the generateYear method',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      const year = moment('14-01-1987', 'DD-MM-YYYY');
      const selected = moment('14-01-1987', 'DD-MM-YYYY');
      const genYear = service.generateYear({numOfMonthRows: 4}, year, [selected]);

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

  it('should check the generateYear method with [1, 2, 3, 4, 6, 12] rows',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      [1, 2, 3, 4, 6, 12].forEach((numOfMonthRows) => {
        const year = moment('14-01-1987', 'DD-MM-YYYY');
        const genYear = service.generateYear({numOfMonthRows}, year, []);
        expect(genYear.length).toBe(numOfMonthRows);

        genYear.forEach((row) => expect(row.length).toBe(12 / numOfMonthRows))
      });
    }));

  it('should check the isDateDisabled method',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      const month: IMonth = {
        date: moment('09-04-2017', 'DD-MM-YYYY'),
        selected: false,
        currentMonth: false,
        disabled: false,
        text: moment('09-04-2017', 'DD-MM-YYYY').format('MMM')
      };
      const config1: any = {
        min: month.date.clone().subtract(1, 'month'),
        max: month.date.clone().add(1, 'month')
      };

      expect(service.isMonthDisabled(month.date, config1)).toBe(false);
      month.date.subtract(1, 'month');
      expect(service.isMonthDisabled(month.date, config1)).toBe(false);
      month.date.subtract(1, 'month');
      expect(service.isMonthDisabled(month.date, config1)).toBe(true);
      month.date.add(3, 'month');
      expect(service.isMonthDisabled(month.date, config1)).toBe(false);
      month.date.add(1, 'month');
      expect(service.isMonthDisabled(month.date, config1)).toBe(true);
    }));

  it('should check getDayBtnText method',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      const date = moment('05-04-2017', 'DD-MM-YYYY');
      expect(service.getMonthBtnText({monthBtnFormat: 'M'}, date)).toEqual('4');
      expect(service.getMonthBtnText({monthBtnFormat: 'MM'}, date)).toEqual('04');
      expect(service.getMonthBtnText({monthBtnFormatter: (m => 'bla')}, date)).toEqual('bla');
      expect(service.getMonthBtnText({monthBtnFormat: 'MM', monthBtnFormatter: (m => m.format('M'))}, date))
        .toEqual('4');
    })
  );

  it('should check getMonthBtnCssClass method',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      const date = moment('05-04-2017', 'DD-MM-YYYY');
      expect(service.getMonthBtnCssClass({}, date)).toEqual('');
      expect(service.getMonthBtnCssClass({monthBtnCssClassCallback: (m => 'class1 class2')}, date))
        .toEqual('class1 class2');
    }));

  it('should validate numOfMonthRows config', () => {
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      [-1, 0, 5, 7, 8, 9, 10, 11, 13].forEach((numOfMonthRows) => {
        expect(service.getConfig({numOfMonthRows}))
          .toThrowError('numOfMonthRows has to be between 1 - 12 and divide 12 to integer');
      });

      [1, 2, 3, 4, 6, 12].forEach((numOfMonthRows) => {
        expect(service.getConfig({numOfMonthRows})).not.toThrowError();
        expect(service.getConfig({numOfMonthRows})).not.toThrowError();
        expect(service.getConfig({numOfMonthRows})).not.toThrowError();
      });
    });
  });
});
