import {inject, TestBed} from '@angular/core/testing';

import {UtilsService} from '../common/services/utils/utils.service';
import {MonthCalendarService} from './month-calendar.service';
import {IMonth} from './month.model';
import {Dayjs} from 'dayjs';
import {dayjsRef} from '../common/dayjs/dayjs.ref';



describe('Service: MonthCalendarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonthCalendarService, UtilsService]
    });
  });

  it('should check the generateYear method',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      const year = dayjsRef('14-01-1987', 'DD-MM-YYYY');
      const selected = dayjsRef('14-01-1987', 'DD-MM-YYYY');
      const genYear = service.generateYear({numOfMonthRows: 4}, year, [selected]);

      let current = year.startOf('year');
      genYear.forEach((row) => {
        row.forEach((month) => {
          expect(month.date.isSame(current, 'month')).toBe(true);
          if (month.date.format('MMM') === 'Jan') {
            expect(month.selected).toBe(true);
          } else {
            expect(month.selected).toBe(false);
          }
          expect(month.currentMonth).toBe(false);

          current = current.add(1, 'month');
        });
      });
    }));

  it('should check the generateYear method with [1, 2, 3, 4, 6, 12] rows',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      [1, 2, 3, 4, 6, 12].forEach((numOfMonthRows) => {
        const year = dayjsRef('14-01-1987', 'DD-MM-YYYY');
        const genYear = service.generateYear({numOfMonthRows}, year, []);
        expect(genYear.length).toBe(numOfMonthRows);

        genYear.forEach((row) => expect(row.length).toBe(12 / numOfMonthRows))
      });
    }));

  it('should check the isDateDisabled method',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      const month: IMonth = {
        date: dayjsRef('09-04-2017', 'DD-MM-YYYY'),
        selected: false,
        currentMonth: false,
        disabled: false,
        text: dayjsRef('09-04-2017', 'DD-MM-YYYY').format('MMM')
      };
      const config1: any = {
        min: month.date.subtract(1, 'month'),
        max: month.date.add(1, 'month')
      };

      expect(service.isMonthDisabled(month.date, config1)).toBe(false);
      month.date = month.date.subtract(1, 'month');
      expect(service.isMonthDisabled(month.date, config1)).toBe(false);
      month.date = month.date.subtract(1, 'month');
      expect(service.isMonthDisabled(month.date, config1)).toBe(true);
      month.date = month.date.add(3, 'month');
      expect(service.isMonthDisabled(month.date, config1)).toBe(false);
      month.date = month.date.add(1, 'month');
      expect(service.isMonthDisabled(month.date, config1)).toBe(true);
    }));

  it('should check the isDateDisabled when isMonthDisabledCallback provided',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      const month: IMonth = {
        date: dayjsRef('01`-01-2017', 'DD-MM-YYYY'),
        selected: false,
        currentMonth: false,
        disabled: false,
        text: dayjsRef('01-01-2017', 'DD-MM-YYYY').format('MMM')
      };
      const config1: any = {
        isMonthDisabledCallback: (m: Dayjs) => {
          return m.get('M') % 2 === 0;
        }
      };

      for (let i = 0; i < 12; i++) {
        if (i % 2 === 0) {
          expect(service.isMonthDisabled(month.date, config1)).toBe(true);
        } else {
          expect(service.isMonthDisabled(month.date, config1)).toBe(false);
        }

        month.date = month.date.add(1, 'month');
      }
    }));

  it('should check getDayBtnText method',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      const date = dayjsRef('05-04-2017', 'DD-MM-YYYY');
      expect(service.getMonthBtnText({monthBtnFormat: 'M'}, date)).toEqual('4');
      expect(service.getMonthBtnText({monthBtnFormat: 'MM'}, date)).toEqual('04');
      expect(service.getMonthBtnText({monthBtnFormatter: (() => 'bla')}, date)).toEqual('bla');
      expect(service.getMonthBtnText({monthBtnFormat: 'MM', monthBtnFormatter: (m => m.format('M'))}, date))
        .toEqual('4');
    })
  );

  it('should check getMonthBtnCssClass method',
    inject([MonthCalendarService], (service: MonthCalendarService) => {
      const date = dayjsRef('05-04-2017', 'DD-MM-YYYY');
      expect(service.getMonthBtnCssClass({}, date)).toEqual('');
      expect(service.getMonthBtnCssClass({monthBtnCssClassCallback: (() => 'class1 class2')}, date))
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
