/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {CalendarService} from './calendar.service';
import * as moment from 'moment';

describe('Service: Calendar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarService]
    });
  });

  it('should check the generateDaysMap method', inject([CalendarService], (service: CalendarService) => {
    expect(service.generateDaysMap('su')).toEqual({ 0: 'su', 1: 'mo', 2: 'tu', 3: 'we', 4: 'th', 5: 'fr', 6: 'sa' });
    expect(service.generateDaysMap('mo')).toEqual({ 0: 'mo', 1: 'tu', 2: 'we', 3: 'th', 4: 'fr', 5: 'sa', 6: 'su' });
    expect(service.generateDaysMap('we')).toEqual({ 0: 'we', 1: 'th', 2: 'fr', 3: 'sa', 4: 'su', 5: 'mo', 6: 'tu' });
  }));

  it('should check the generateMonthArray method', inject([CalendarService], (service: CalendarService) => {
    let monthWeeks = service.generateMonthArray('su', moment('11-10-2016', 'DD-MM-YYYY'));
    expect(monthWeeks[0][0].format('DD-MM-YYYY')).toBe('25-09-2016');
    expect(monthWeeks[5][6].format('DD-MM-YYYY')).toBe('05-11-2016');

    monthWeeks = service.generateMonthArray('mo', moment('11-10-2016', 'DD-MM-YYYY'));
    expect(monthWeeks[0][0].format('DD-MM-YYYY')).toBe('26-09-2016');
    expect(monthWeeks[5][6].format('DD-MM-YYYY')).toBe('06-11-2016');
  }));
});
