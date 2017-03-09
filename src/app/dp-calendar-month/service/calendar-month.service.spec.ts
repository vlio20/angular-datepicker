/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {CalendarMonthService} from './calendar-month.service';
import * as moment from 'moment';
import {ICalendarMonthConfig} from '../config/calendar-month-config.model';
import {Moment} from 'moment';

describe('Service: Calendar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarMonthService]
    });
  });

  it('should check the generateDaysMap method', inject([CalendarMonthService], (service: CalendarMonthService) => {
    expect(service.generateDaysIndexMap('su')).toEqual({0: 'su', 1: 'mo', 2: 'tu', 3: 'we', 4: 'th', 5: 'fr', 6: 'sa'});
    expect(service.generateDaysIndexMap('mo')).toEqual({0: 'mo', 1: 'tu', 2: 'we', 3: 'th', 4: 'fr', 5: 'sa', 6: 'su'});
    expect(service.generateDaysIndexMap('we')).toEqual({0: 'we', 1: 'th', 2: 'fr', 3: 'sa', 4: 'su', 5: 'mo', 6: 'tu'});
  }));

  it('should check the generateDaysMap method', inject([CalendarMonthService], (service: CalendarMonthService) => {
    expect(service.generateDaysMap('su')).toEqual({'su': 0, 'mo': 1, 'tu': 2, 'we': 3, 'th': 4, 'fr': 5, 'sa': 6});
    expect(service.generateDaysMap('mo')).toEqual({'mo': 0, 'tu': 1, 'we': 2, 'th': 3, 'fr': 4, 'sa': 5, 'su': 6});
    expect(service.generateDaysMap('we')).toEqual({'we': 0, 'th': 1, 'fr': 2, 'sa': 3, 'su': 4, 'mo': 5, 'tu': 6});
  }));

  it('should check the generateMonthArray method', inject([CalendarMonthService], (service: CalendarMonthService) => {
    let monthWeeks = service.generateMonthArray('su', moment('11-10-2016', 'DD-MM-YYYY'), [moment('11-10-2016', 'DD-MM-YYYY')]);
    expect(monthWeeks[0][0].date.format('DD-MM-YYYY')).toBe('25-09-2016');
    expect(monthWeeks[0][0].prevMonth).toBe(true);
    expect(monthWeeks[0][0].currentMonth).toBe(false);
    expect(monthWeeks[0][0].nextMonth).toBe(false);

    expect(monthWeeks[5][6].date.format('DD-MM-YYYY')).toBe('05-11-2016');
    expect(monthWeeks[5][6].prevMonth).toBe(false);
    expect(monthWeeks[5][6].currentMonth).toBe(false);
    expect(monthWeeks[5][6].nextMonth).toBe(true);

    monthWeeks = service.generateMonthArray(
      'mo',
      moment('11-10-2016', 'DD-MM-YYYY'),
      [moment('11-10-2016', 'DD-MM-YYYY'), moment('13-10-2016', 'DD-MM-YYYY')]
    );
    expect(monthWeeks[0][0].date.format('DD-MM-YYYY')).toBe('26-09-2016');
    expect(monthWeeks[5][6].date.format('DD-MM-YYYY')).toBe('06-11-2016');
    expect(monthWeeks[2][1].selected).toBe(true);
    expect(monthWeeks[2][3].selected).toBe(true);

    monthWeeks = service.generateMonthArray('mo', moment('11-10-2016', 'DD-MM-YYYY'), [moment('11-10-2016', 'DD-MM-YYYY')]);
    expect(monthWeeks[0][0].date.format('DD-MM-YYYY')).toBe('26-09-2016');
    expect(monthWeeks[5][6].date.format('DD-MM-YYYY')).toBe('06-11-2016');
    expect(monthWeeks[2][1].selected).toBe(true);
    expect(monthWeeks[2][3].selected).toBe(false);

    monthWeeks = service.generateMonthArray('mo', moment('11-10-2016', 'DD-MM-YYYY'), []);
    expect(monthWeeks[0][0].date.format('DD-MM-YYYY')).toBe('26-09-2016');
    expect(monthWeeks[5][6].date.format('DD-MM-YYYY')).toBe('06-11-2016');
    expect(monthWeeks[2][1].selected).toBe(false);
    expect(monthWeeks[2][3].selected).toBe(false);

    monthWeeks = service.generateMonthArray('mo', moment('11-10-2016', 'DD-MM-YYYY'), null);
    expect(monthWeeks[0][0].date.format('DD-MM-YYYY')).toBe('26-09-2016');
    expect(monthWeeks[5][6].date.format('DD-MM-YYYY')).toBe('06-11-2016');
    expect(monthWeeks[2][1].selected).toBe(false);
    expect(monthWeeks[2][3].selected).toBe(false);
  }));


  it('should check the generateWeekdays method', inject([CalendarMonthService], (service: CalendarMonthService) => {
    expect(service.generateWeekdays('su', {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    })).toEqual(['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']);

    expect(service.generateWeekdays('mo', {
      su: 'sun',
      mo: 'mon',
      tu: 'tue',
      we: 'wed',
      th: 'thu',
      fr: 'fri',
      sa: 'sat'
    })).toEqual(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);

    expect(service.generateWeekdays('mo', {
      su: '1',
      mo: '2',
      tu: '3',
      we: '4',
      th: '5',
      fr: '6',
      sa: '7'
    })).toEqual(['2', '3', '4', '5', '6', '7', '1']);
  }));

  it('should check isDateDisabled method', inject([CalendarMonthService], (service: CalendarMonthService) => {
    const config: ICalendarMonthConfig = {
      month: moment('13-10-2016', 'DD-MM-YYYY'),
      firstDayOfWeek: 'su',
      min: moment('13-10-2016', 'DD-MM-YYYY').subtract(1, 'day'),
      max: moment('13-10-2016', 'DD-MM-YYYY').add(1, 'day')
    };

    expect(service.isDateDisabled({date: moment('11-10-2016', 'DD-MM-YYYY')}, config)).toBe(true);
    expect(service.isDateDisabled({date: moment('12-10-2016', 'DD-MM-YYYY')}, config)).toBe(false);
    expect(service.isDateDisabled({date: moment('13-10-2016', 'DD-MM-YYYY')}, config)).toBe(false);
    expect(service.isDateDisabled({date: moment('14-10-2016', 'DD-MM-YYYY')}, config)).toBe(false);
    expect(service.isDateDisabled({date: moment('15-10-2016', 'DD-MM-YYYY')}, config)).toBe(true);

    config.isDisabledCallback = (date: Moment) => {
      return date.isSame(moment('13-10-2016', 'DD-MM-YYYY'), 'day');
    };

    expect(service.isDateDisabled({date: moment('13-10-2016', 'DD-MM-YYYY')}, config)).toBe(true);
    expect(service.isDateDisabled({date: moment('11-10-2016', 'DD-MM-YYYY')}, config)).toBe(false);

  }));
});
