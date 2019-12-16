import {inject, TestBed} from '@angular/core/testing';
import {DayCalendarService} from './day-calendar.service';
import * as momentNs from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {IDayCalendarConfigInternal} from './day-calendar-config.model';

const moment = momentNs;

describe('Service: Calendar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayCalendarService, UtilsService]
    });
  });

  it('should check the generateDaysMap method', inject([DayCalendarService],
    (service: DayCalendarService) => {
      expect(service.generateDaysIndexMap('su'))
        .toEqual({0: 'su', 1: 'mo', 2: 'tu', 3: 'we', 4: 'th', 5: 'fr', 6: 'sa'});
      expect(service.generateDaysIndexMap('mo'))
        .toEqual({0: 'mo', 1: 'tu', 2: 'we', 3: 'th', 4: 'fr', 5: 'sa', 6: 'su'});
      expect(service.generateDaysIndexMap('we'))
        .toEqual({0: 'we', 1: 'th', 2: 'fr', 3: 'sa', 4: 'su', 5: 'mo', 6: 'tu'});
    }));

  it('should check the generateDaysMap method', inject([DayCalendarService],
    (service: DayCalendarService) => {
      expect(service.generateDaysMap('su'))
        .toEqual({'su': 0, 'mo': 1, 'tu': 2, 'we': 3, 'th': 4, 'fr': 5, 'sa': 6});
      expect(service.generateDaysMap('mo'))
        .toEqual({'mo': 0, 'tu': 1, 'we': 2, 'th': 3, 'fr': 4, 'sa': 5, 'su': 6});
      expect(service.generateDaysMap('we'))
        .toEqual({'we': 0, 'th': 1, 'fr': 2, 'sa': 3, 'su': 4, 'mo': 5, 'tu': 6});
    }
  ));

  it('should check the generateMonthArray method', inject([DayCalendarService],
    (service: DayCalendarService) => {
      let monthWeeks = service.generateMonthArray(
        {
          firstDayOfWeek: 'su'
        },
        moment('11-10-2016', 'DD-MM-YYYY'),
        [moment('11-10-2016', 'DD-MM-YYYY')]);
      expect(monthWeeks[0][0].date.format('DD-MM-YYYY')).toBe('25-09-2016');
      expect(monthWeeks[0][0].prevMonth).toBe(true);
      expect(monthWeeks[0][0].currentMonth).toBe(false);
      expect(monthWeeks[0][0].nextMonth).toBe(false);

      expect(monthWeeks[5][6].date.format('DD-MM-YYYY')).toBe('05-11-2016');
      expect(monthWeeks[5][6].prevMonth).toBe(false);
      expect(monthWeeks[5][6].currentMonth).toBe(false);
      expect(monthWeeks[5][6].nextMonth).toBe(true);

      monthWeeks = service.generateMonthArray(
        {
          firstDayOfWeek: 'mo'
        },
        moment('11-10-2016', 'DD-MM-YYYY'),
        [moment('11-10-2016', 'DD-MM-YYYY'), moment('13-10-2016', 'DD-MM-YYYY')]
      );
      expect(monthWeeks[0][0].date.format('DD-MM-YYYY')).toBe('26-09-2016');
      expect(monthWeeks[5][6].date.format('DD-MM-YYYY')).toBe('06-11-2016');
      expect(monthWeeks[2][1].selected).toBe(true);
      expect(monthWeeks[2][3].selected).toBe(true);

      monthWeeks = service.generateMonthArray(
        {
          firstDayOfWeek: 'mo'
        },
        moment('11-10-2016', 'DD-MM-YYYY'),
        [moment('11-10-2016', 'DD-MM-YYYY')]);
      expect(monthWeeks[0][0].date.format('DD-MM-YYYY')).toBe('26-09-2016');
      expect(monthWeeks[5][6].date.format('DD-MM-YYYY')).toBe('06-11-2016');
      expect(monthWeeks[2][1].selected).toBe(true);
      expect(monthWeeks[2][3].selected).toBe(false);

      monthWeeks = service.generateMonthArray(
        {
          firstDayOfWeek: 'mo'
        },
        moment('11-10-2016', 'DD-MM-YYYY'),
        []
      );
      expect(monthWeeks[0][0].date.format('DD-MM-YYYY')).toBe('26-09-2016');
      expect(monthWeeks[5][6].date.format('DD-MM-YYYY')).toBe('06-11-2016');
      expect(monthWeeks[2][1].selected).toBe(false);
      expect(monthWeeks[2][3].selected).toBe(false);

      monthWeeks = service.generateMonthArray(
        {
          firstDayOfWeek: 'mo'
        },
        moment('11-10-2016', 'DD-MM-YYYY'),
        []
      );
      expect(monthWeeks[0][0].date.format('DD-MM-YYYY')).toBe('26-09-2016');
      expect(monthWeeks[5][6].date.format('DD-MM-YYYY')).toBe('06-11-2016');
      expect(monthWeeks[2][1].selected).toBe(false);
      expect(monthWeeks[2][3].selected).toBe(false);
    }));

  it('should check the generateWeekdays method', inject([DayCalendarService],
    (service: DayCalendarService) => {
      expect(
        service.generateWeekdays('su').map(d => d.format('ddd'))
      ).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);

      expect(
        service.generateWeekdays('mo').map(d => d.format('ddd'))
      ).toEqual(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
    }));

  it('should check isDateDisabled method', inject([DayCalendarService],
    (service: DayCalendarService) => {
      const config: IDayCalendarConfigInternal = {
        firstDayOfWeek: 'su',
        min: moment('13-10-2016', 'DD-MM-YYYY').subtract(1, 'day'),
        max: moment('13-10-2016', 'DD-MM-YYYY').add(1, 'day')
      };

      expect(service.isDateDisabled(moment('11-10-2016', 'DD-MM-YYYY'), config)).toBe(true);
      expect(service.isDateDisabled(moment('12-10-2016', 'DD-MM-YYYY'), config)).toBe(false);
      expect(service.isDateDisabled(moment('13-10-2016', 'DD-MM-YYYY'), config)).toBe(false);
      expect(service.isDateDisabled(moment('14-10-2016', 'DD-MM-YYYY'), config)).toBe(false);
      expect(service.isDateDisabled(moment('15-10-2016', 'DD-MM-YYYY'), config)).toBe(true);

      config.isDayDisabledCallback = (date: Moment) => {
        return date.isSame(moment('13-10-2016', 'DD-MM-YYYY'), 'day');
      };

      expect(service.isDateDisabled(moment('13-10-2016', 'DD-MM-YYYY'), config)).toBe(true);
      expect(service.isDateDisabled(moment('11-10-2016', 'DD-MM-YYYY'), config)).toBe(false);
    }));

  it('should show/hide near month according to showNearMonthDays configuration', inject([DayCalendarService],
    (service: DayCalendarService) => {
      const config: IDayCalendarConfigInternal = {
        firstDayOfWeek: 'su',
        showNearMonthDays: true
      };

      expect(service.generateMonthArray(config, moment('27-03-2017', 'DD-MM-YYYY'), []).length).toBe(6);
      config.showNearMonthDays = false;
      expect(service.generateMonthArray(config, moment('27-03-2017', 'DD-MM-YYYY'), []).length).toBe(5);
    }));

  it('should not effect the calendar when no full near weeks even if showNearMonthDays is false',
    inject([DayCalendarService],
      (service: DayCalendarService) => {
        const config: IDayCalendarConfigInternal = {
          firstDayOfWeek: 'su',
          showNearMonthDays: false
        };

        expect(service.generateMonthArray(config, moment('27-04-2017', 'DD-MM-YYYY'), []).length).toBe(6);
      }));

  it('should check getDayBtnText method',
    inject([DayCalendarService],
      (service: DayCalendarService) => {
        const date = moment('05-04-2017', 'DD-MM-YYYY');
        expect(service.getDayBtnText({dayBtnFormat: 'DD'}, date)).toEqual('05');
        expect(service.getDayBtnText({dayBtnFormat: 'D'}, date)).toEqual('5');
        expect(service.getDayBtnText({dayBtnFormatter: (m => 'bla')}, date)).toEqual('bla');
        expect(service.getDayBtnText({dayBtnFormat: 'DD', dayBtnFormatter: (m => m.format('D'))}, date))
          .toEqual('5');
      }));

  it('should check getDayBtnCssClass method',
    inject([DayCalendarService],
      (service: DayCalendarService) => {
        const date = moment('05-04-2017', 'DD-MM-YYYY');
        expect(service.getDayBtnCssClass({}, date)).toEqual('');
        expect(service.getDayBtnCssClass({dayBtnCssClassCallback: (m => 'class1 class2')}, date))
          .toEqual('class1 class2');
      }));
});
