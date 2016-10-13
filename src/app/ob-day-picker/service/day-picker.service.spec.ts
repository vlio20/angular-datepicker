/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {DayPickerService} from './day-picker.service';
import * as moment from 'moment';

describe('Service: DayPicker', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayPickerService]
    });
  });

  it('should check generateCalendars method', inject([DayPickerService], (service: DayPickerService) => {
    const calendars1 = service.generateCalendars({calendarsAmount: 1}, null);
    expect(calendars1.length).toBe(1);
    expect(calendars1[0].month.isSame(moment(), 'month')).toBe(true);

    const calendars2 = service.generateCalendars({calendarsAmount: 2}, null);
    expect(calendars2.length).toBe(2);
    expect(calendars2[0].month.isSame(moment(), 'month')).toBe(true);
    expect(calendars2[1].month.isSame(moment().add(1, 'month'), 'month')).toBe(true);

    const calendars3 = service.generateCalendars({calendarsAmount: 2}, moment('13-10-2015', 'DD-MM-YYYY'));
    expect(calendars3.length).toBe(2);
    expect(calendars3[0].month.isSame(moment('13-10-2015', 'DD-MM-YYYY'), 'month')).toBe(true);
    expect(calendars3[1].month.isSame(moment('13-11-2015', 'DD-MM-YYYY'), 'month')).toBe(true);

    const calendars4 = service.generateCalendars({calendarsAmount: 2}, moment(), moment('13-10-2015', 'DD-MM-YYYY'));
    expect(calendars4.length).toBe(2);
    expect(calendars4[0].month.isSame(moment('13-10-2015', 'DD-MM-YYYY'), 'month')).toBe(true);
    expect(calendars4[1].month.isSame(moment('13-11-2015', 'DD-MM-YYYY'), 'month')).toBe(true);
  }));

  it('should check isDateValid method', inject([DayPickerService], (service: DayPickerService) => {
    expect(service.isDateValid('13-10-2015', 'DD-MM-YYYY')).toBe(true);
    expect(service.isDateValid('13-10-2015', 'DD-MM-YY')).toBe(false);
  }));

  it('should check moveCalendars method', inject([DayPickerService], (service: DayPickerService) => {
    const calendars1 = service.moveCalendars({calendarsAmount: 1}, null, moment(), 1);
    expect(calendars1.length).toBe(1);
    expect(calendars1[0].month.isSame(moment().add(1, 'month'), 'month')).toBe(true);

    const calendars2 = service.moveCalendars({calendarsAmount: 2}, null, moment(), 1);
    expect(calendars2.length).toBe(2);
    expect(calendars2[0].month.isSame(moment().add(1, 'month'), 'month')).toBe(true);
    expect(calendars2[1].month.isSame(moment().add(2, 'month'), 'month')).toBe(true);

    const calendars3 = service.moveCalendars({calendarsAmount: 2}, null, moment(), -1);
    expect(calendars3.length).toBe(2);
    expect(calendars3[0].month.isSame(moment().add(-1, 'month'), 'month')).toBe(true);
    expect(calendars3[1].month.isSame(moment(), 'month')).toBe(true);
  }));

  it('should check isMinMonth method', inject([DayPickerService], (service: DayPickerService) => {
    expect(service.isMinMonth(moment(), moment())).toBe(true);
    expect(service.isMinMonth(moment().subtract(1, 'month'), moment())).toBe(false);
  }));

  it('should check isMaxMonth method', inject([DayPickerService], (service: DayPickerService) => {
    expect(service.isMaxMonth(moment(), moment())).toBe(true);
    expect(service.isMaxMonth(moment().add(1, 'month'), moment())).toBe(false);
  }));
});
